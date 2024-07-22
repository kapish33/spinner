import { Schema, model, Document } from 'mongoose';
import { z } from 'zod';

// Define Zod schema
const processingRequestSchemaZod = z.object({
  requestId: z.string().uuid(),
  status: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
});

// Define TypeScript type from Zod schema
type IProcessingRequest = z.infer<typeof processingRequestSchemaZod> & Document;

// Define Mongoose schema
const processingRequestSchema = new Schema<IProcessingRequest>({
  requestId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ProcessingRequest = model<IProcessingRequest>('ProcessingRequest', processingRequestSchema);

export { ProcessingRequest, IProcessingRequest, processingRequestSchemaZod };
