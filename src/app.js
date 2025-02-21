import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { integrationSpecSettings } from "./integrationSpec.js";
import webhookRoutes from "./routes/webhookRoutes.js"; // Import the webhook routes

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Routes
app.get("/", (req, res) =>
  res.json({ message: "GIF Responder API is running" })
);
app.get("/integration-spec.json", (req, res) =>
  res.json(integrationSpecSettings)
);
app.use("/webhook", webhookRoutes); // Use the webhook routes

// 404 Handler
app.all("*", (req, res) => {
  res.status(404).json({
    statusText: "fail",
    message: "The requested resource could not be found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { errorDetails: err.stack }),
  });
});

export default app;
