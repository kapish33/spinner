import multer, { FileFilterCallback } from "multer";
import { randomUUID } from "node:crypto";
import fs from "fs";
import path from "path";

import { Request } from "express";
import { getFileNameParts } from "@/utills/file";

const allowedMimeTypes = ["text/csv", "application/vnd.ms-excel"];
const uploadFolder = "uploads/";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    cb(null, uploadFolder);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const id = randomUUID();
    req.requestId = id;

    cb(null, getFileNameParts(file, id));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only CSV files are allowed."));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});
