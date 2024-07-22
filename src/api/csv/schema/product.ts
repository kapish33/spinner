import { Schema, model, Document } from 'mongoose';
import { z } from 'zod';

const statusEnum = z.enum(['Pending', 'Done']);

// Define Zod schema
const productSchemaZod = z.object({
  requestId: z.string(),
  serialNumber: z.number().int().positive(),
  productName: z.string(),
  inputImageUrls: z.array(z.string().url()).nonempty(),
  outputImageUrls: z.array(z.string().url()).optional(),
  status: statusEnum.optional(), 
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
});

// Define TypeScript type from Zod schema
type IProduct = z.infer<typeof productSchemaZod> & Document;

// Define Mongoose schema
const productSchema = new Schema<IProduct>({
  requestId: { type: String, required: true }, 
  serialNumber: { type: Number, required: true },
  productName: { type: String, required: true },
  inputImageUrls: { type: [String], required: true },
  outputImageUrls: { type: [String] },
  status: { type: String, enum: ['Pending', 'Done'], default: 'Pending' },
},{
  versionKey: false,
  timestamps: true,
});

const Product = model<IProduct>('Product', productSchema);

export { Product, IProduct, productSchemaZod };
