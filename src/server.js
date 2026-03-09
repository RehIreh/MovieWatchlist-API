import "dotenv/config";
import express from "express";
import  { config } from 'dotenv'
import { prisma, connectDB, disconnectDB} from './config/db.js'

import MovieRoutes from "./routes/movieRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import watchlistRoutes from "./routes/watchlistRoutes.js"


config ();
connectDB();

const app = express();

// Body Prasing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use("/movies", MovieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);



const PORT = 5001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

// Database connection errros
process.on("unhandledRejection",(err) => {
  console.error("Unhandle Rejection:", err);
  server.close(async() => {
    await disconnectDB();
    process.exit(1);
  });
});

// Uncaught Exceptions
process.on("uncaughtException", async(err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful Shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM Received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});