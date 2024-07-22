import { StatusCodes } from "http-status-codes";

import type { CSV, ExtendedFile } from "@/api/csv/csvModel";
import { scvRepository } from "@/api/csv/csvRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { downloadAndResizeImage, parseCSV } from "@/utills/csv";
import { IProduct, Product } from "./schema/product";
import fs from "fs";
import path from "path";
import { Parser } from "json2csv";

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
      const outputFilePath = await this.scvRepository.processCSVAndSave(payload);

      return ServiceResponse.success<string>(
        `CSV Created for ${payload.requestId}`,
        outputFilePath
      );
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
