import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Database connection
    await prisma.connect();

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await prisma.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.disconnect();
  process.exit(0);
});
