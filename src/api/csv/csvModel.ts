import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type CSV = z.infer<typeof CSVSchema>;
export const CSVSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET csvs/:id' endpoint
export const GetSCVSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export interface ExtendedFile extends Express.Multer.File {
  requestId: string | undefined;
}
