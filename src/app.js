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

app.post("/webhook", async (req, res) => {
  const { message, settings } = req.body;

  if (!message || !settings) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid request data" });
  }

  // Extract settings into a more usable format
  const settingsMap = settings.reduce((acc, setting) => {
    acc[setting.label] = setting.default;
    return acc;
  }, {});

  const giphyApiKey = settingsMap["Giphy Api Key"];
  const customKeywords = settingsMap["Custom Keywords"]
    ? settingsMap["Custom Keywords"].split(",").map((word) => word.trim())
    : [];

  // Extract words from the message (removing HTML tags)
  const textContent = message.replace(/<[^>]*>/g, " ").trim();
  const words = textContent.split(/\s+/);

  for (const word of words) {
    if (customKeywords.includes(word.toLowerCase())) {
      const gifUrl = await getGif(word, giphyApiKey); // Fetch GIF for first matching keyword
      if (gifUrl) {
        const formattedMessage = `
          <div>
            <p>${message}</p>
            <p><img src="${gifUrl}" alt="GIF"></p>
          </div>
        `;

        return res.json({
          status: "success",
          message: formattedMessage,
        });
      }
    }
  }

  return res.json({
    status: "success",
    message: `<div>${message}</div>`,
  });
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

    ...(process.env.NODE_ENV !== "production" && { errorDetails: err.stack }),
  });
});

export default app;
