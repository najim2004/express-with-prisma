import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
import { PrismaClient } from "../../prisma/generate/client";

dotenv.config();

class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }

    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async connect() {
    try {
      await this.$connect();
      console.log("Successfully connected to the database.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }

  async disconnect() {
    await this.$disconnect();
  }
}

const prisma = new PrismaService();
export { prisma };
