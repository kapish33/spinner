import mongoose from "mongoose";
import { logger } from "@/server";
import { env } from "@/common/utils/envConfig";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_DB_URL);
    logger.info("✅ MongoDB connected...");
  } catch (error) {
    logger.error("❌ MongoDB connection failed 💔");
    process.exit(1);
  }
};
