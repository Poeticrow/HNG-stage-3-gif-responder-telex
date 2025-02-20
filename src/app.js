import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { integrationSpecSettings } from "./integrationSpec.js";
import { getGif } from "./utils/utils.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Routes

// Root route
app.get("/", (req, res) => {
  return res.json({ message: "GIF Responder API is running" });
});
app.get("/integration-spec.json", (req, res) => {
  return res.json(integrationSpecSettings);
});

const keywordMap = {
  happy: "celebration",
  sad: "crying",
  excited: "party",
  funny: "laugh",
};

app.post("/process-message", async (req, res) => {
  const { message } = req.body;
  const words = message.toLowerCase().split(" ");

  for (const word of words) {
    if (keywordMap[word]) {
      const gifUrl = await getGif(keywordMap[word]);
      if (gifUrl) {
        return res.json({ response: gifUrl });
      }
    }
  }

  res.json({ response: "No GIF found for this message." });
});

const catchAllHandler = (req, res, next) => {
  res.status(404).json({
    statusText: "fail",
    message: "The requested resource could not be found",
  });
  next();
};

app.all("*", catchAllHandler);

/// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(statusCode).json({
    status: "error",
    message: message,
    // Optional: Include stack trace or additional error details in non-production
    ...(process.env.NODE_ENV !== "production" && { errorDetails: err.stack }),
  });
});

export default app;
