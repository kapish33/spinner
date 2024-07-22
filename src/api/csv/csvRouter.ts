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

export const csvRegistry = new OpenAPIRegistry();
export const csvRouter: Router = express.Router();

csvRegistry.register("CSV Service", CSVSchema);

csvRegistry.registerPath({
  method: "get",
  path: "/csv",
  tags: ["CSV"],
  responses: createApiResponse(z.array(CSVSchema), "Success"),
});


csvRegistry.registerPath({
  method: "get",
  path: "/csv/{id}",
  tags: ["CSV"],
  request: { params: GetSCVSchema.shape.params },
  responses: createApiResponse(CSVSchema, "Success"),
});


csvRouter.post(
  "/upload",
  upload.single("file"),
  validateCSV,
  async (req: Request, res: Response) => {
    const payload: ExtendedFile = {
      ...(req.file as Express.Multer.File),
      requestId: req.requestId,
    };
    const serviceResponse = await csvServiceInstance.uploadCSV(payload);
    return handleServiceResponse(serviceResponse, res);
  }
);


csvRouter.get(
  "/:id",
  validateRequest(GetSCVSchema),
  async (req: Request, res: Response) => {
    const id = req.params.id
    const serviceResponse = await csvServiceInstance.findById(id);
    return handleServiceResponse(serviceResponse, res);
  }
);