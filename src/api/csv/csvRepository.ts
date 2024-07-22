import { downloadAndResizeImage, parseCSV } from "@/utills/csv";
import { ExtendedFile } from "./csvModel";
import { IProduct, Product } from "./schema/product";
import { Parser } from "json2csv";
import fs from "fs";
import path from "path";

export class scvRepository {
  async findByIdAsync(requestId: string): Promise<IProduct[] | null> {
    const products = await Product.find({ requestId }).exec();

    return products;
  }

   async processCSVAndSave(payload: ExtendedFile): Promise<string> {
    const csvFileName = payload.path;
    const results = await parseCSV(csvFileName);
    const productsData = [];

    for (const row of results) {
      const {
        "Serial Number": serialNumber,
        "Product Name": productName,
        "Input Image Urls": inputImageUrls,
      } = row;
      const product = new Product({
        requestId: payload.requestId,
        serialNumber: serialNumber,
        productName: productName,
        inputImageUrls: inputImageUrls.split(","),
        status: "Pending",
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
      await Product.findByIdAndUpdate(
        product._id,
        { outputImageUrls: outPutImagedata, status: "Done" },
        { new: true }
      );

      // Prepare data for CSV
      productsData.push({
        "S. No.": product.serialNumber,
        "Product Name": product.productName,
        "Input Image Urls": product.inputImageUrls.join("; "), // Join URLs with a delimiter
        "Output Image Urls": product.outputImageUrls?.join("; ") || "", // Join URLs with a delimiter
      });
    }

    // Convert JSON data to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(productsData);

    // Define the output path
    const outputFolder = path.join("csvOut");
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }
    const outputFilePath = path.join(outputFolder, `${payload.requestId}.csv`);
    const futureS3Path = path.resolve('csvOut', `ffedcbf-72c7-4e4b-9adf-c36f8c263aac.csv`);


    // Save CSV to a file
    fs.writeFileSync(outputFilePath, csv);

    return futureS3Path;
  }
}
