// src/middleware/validateCSV.ts

import { Request, Response, NextFunction } from "express";
import fs from "fs";
import csvParser from "csv-parser";

// Define the interface for the CSV row
interface CSVRow {
  "Serial Number": string;
  "Product Name": string;
  "Input Image Urls": string;
}

const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const validateCSV = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  if (!req.requestId) {
    return res.status(400).send("requestId is missing.");
  }
  (req.file as Express.Multer.File & { requestId?: string }).requestId =
    req.requestId;

  const results: CSVRow[] = [];
  const expectedHeaders = ["Serial Number", "Product Name", "Input Image Urls"];

  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on("headers", (headers: string[]) => {
      const missingHeaders = expectedHeaders.filter(
        (header) => !headers.includes(header)
      );
      if (missingHeaders.length > 0) {
        return res
          .status(400)
          .send(`Missing headers: ${missingHeaders.join(", ")}`);
      }
    })
    .on("data", (data: CSVRow) => {
      const serialNumber = Number(data["Serial Number"]);
      const productName = data["Product Name"];
      const inputImageUrls = data["Input Image Urls"]
        .split(",")
        .map((url) => url.trim());

      // Check if 'Serial Number' is a valid number
      if (isNaN(serialNumber)) {
        return res.status(400).send("Invalid Serial Number format.");
      }

      // Check if 'Product Name' is a string (basic check for non-empty string)
      if (typeof productName !== "string" || productName.trim() === "") {
        return res.status(400).send("Invalid Product Name format.");
      }

      // Check if 'Input Image Urls' is an array of valid URLs
      for (const url of inputImageUrls) {
        if (!isValidURL(url)) {
          return res
            .status(400)
            .send("Invalid URL format in Input Image Urls.");
        }
      }

      results.push({
        "Serial Number": serialNumber.toString(),
        "Product Name": productName,
        "Input Image Urls": inputImageUrls.join(","),
      });
    })
    .on("end", () => {
      // Optionally, store results or perform additional checks here
      console.log("CSV file successfully processed");
      next(); // Proceed to the next middleware or route handler
    })
    .on("error", (error: Error) => {
      res.status(500).send(`Error processing file: ${error.message}`);
    });
};
