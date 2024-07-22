import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { CSVSchema, ExtendedFile, GetSCVSchema } from "@/api/csv/csvModel";
import { csvServiceInstance } from "@/api/csv/csvService";
import {
  handleServiceResponse,
  validateRequest,
} from "@/common/utils/httpHandlers";

import { upload } from "@/middleware/multer";
import { validateCSV } from "@/middleware/verifyCcsFileds";
import { productSchemaZod } from "./schema/product";

export const csvRegistry = new OpenAPIRegistry();
export const csvRouter: Router = express.Router();

// Define schemas
const FileUploadRequestSchema = z.object({
  file: z.string().describe("The CSV file to be uploaded."),
});

const FileUploadResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

// Register API paths with correct content
csvRegistry.register("CSV Service", CSVSchema);

csvRegistry.registerPath({
  method: "post",
  path: "/upload",
  tags: ["CSV"],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            file: z.string().describe("The CSV file to be uploaded."),
          }),
        },
      },
    },
  },
  responses: createApiResponse(FileUploadResponseSchema, "Success"),
});

csvRegistry.registerPath({
  method: "get",
  path: "/csv/{id}",
  tags: ["CSV"],
  request: { params: GetSCVSchema.shape.params },
  responses: createApiResponse(z.array(productSchemaZod), "Success"),
});

csvRouter.post(
  "/upload",
  upload.single("file"),
  validateCSV,
  async (req: Request, res: Response) => {
    const payload: ExtendedFile = {
      ...(req.file as Express.Multer.File), // Type assertion
      requestId: req.requestId, // Add requestId
    };
    const serviceResponse = await csvServiceInstance.uploadCSV(payload);

    return handleServiceResponse(serviceResponse, res);
  }
);

csvRouter.get(
  "/:id",
  validateRequest(GetSCVSchema),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await csvServiceInstance.findById(id);
    return handleServiceResponse(serviceResponse, res);
  }
);
