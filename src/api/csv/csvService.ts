import { StatusCodes } from "http-status-codes";

import type { CSV, ExtendedFile } from "@/api/csv/csvModel";
import { scvRepository } from "@/api/csv/csvRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { downloadAndResizeImage, parseCSV } from "@/utills/csv";
import { IProduct, Product } from "./schema/product";

export class csvService {
  private scvRepository: scvRepository;

  constructor(repository: scvRepository = new scvRepository()) {
    this.scvRepository = repository;
  }


  // Retrieves a single user by their ID
  async findById(id: string): Promise<ServiceResponse<IProduct[] | null>> {
    try {
      const users = await this.scvRepository.findByIdAsync(id);
      if (users?.length === 0 || !users) {
        return ServiceResponse.failure(
          "Based On Your Request Id We Don't Have Any CSV Data Available 💔",
          null,
          StatusCodes.NOT_FOUND
        );
      }
     
      
      return ServiceResponse.success<IProduct[]>("CSV Data Available", users);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // // Create a new CSV for process image

  async uploadCSV(
    payload: ExtendedFile
  ): Promise<ServiceResponse<string | null>> {
    try {
      const csvFileName = payload.path;
      const results = await parseCSV(csvFileName);

      for (const row of results) {
        const { 'Serial Number': serialNumber, 'Product Name': productName, 'Input Image Urls': inputImageUrls } = row;
        const product = new Product({
          requestId: payload.requestId,
          serialNumber: serialNumber,
          productName: productName,
          inputImageUrls: inputImageUrls.split(','),
          status: "Pending"
        });
        await product.save();
        const imageUrls: string[] = row["Input Image Urls"].split(",");
        const outPutImagedata = [];
        for (const imageUrl of imageUrls) {
          const currentPath = await downloadAndResizeImage(
            imageUrl.trim(),
            "output",
            payload.filename
          );
          
          outPutImagedata.push(currentPath);
        }
        await Product.findByIdAndUpdate(product._id, { outputImageUrls: outPutImagedata ,status: "Done"}, { new: true });
      }


      return ServiceResponse.success<string>(`CSV Created for ${payload.requestId}`, "In Progress ...");
    } catch (ex) {
      const errorMessage = `Error:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const csvServiceInstance = new csvService();
