import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is running professionally! 🚀",
  });
});

// Test Prisma Route
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default app;
