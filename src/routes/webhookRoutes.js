import express from "express";
import { getGif } from "../utils/utils.js";
import validateWebhook from "../middlewares/validateWebhook.js";

const router = express.Router();

router.post("/", validateWebhook, async (req, res) => {
  const { message, settings } = req.body;

  if (!message || !settings) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid request data" });
  }

  // Extract settings
  const settingsMap = settings.reduce((acc, setting) => {
    acc[setting.label] = setting.default;
    return acc;
  }, {});

  const giphyApiKey = settingsMap["Giphy Api Key"];
  const customKeywords = settingsMap["Custom Keywords"]
    ? settingsMap["Custom Keywords"].split(",").map((word) => word.trim())
    : [];

  // Return error if Giphy API key is missing
  if (!giphyApiKey) {
    return res.status(400).json({
      status: "error",
      message: "Missing Giphy API key",
    });
  }

  // Extract words from the message (removing HTML tags)
  const textContent = message.replace(/<[^>]*>/g, " ").trim();
  const words = textContent.split(/\s+/);

  for (const word of words) {
    if (customKeywords.includes(word.toLowerCase())) {
      try {
        const gifUrl = await getGif(word, giphyApiKey);
        if (gifUrl) {
          return res.json({
            status: "success",
            message: `<div><p>${message}</p><p><img src="${gifUrl}" alt="GIF"></p></div>`,
          });
        }
      } catch (error) {
        console.error("Giphy API error:", error);
        return res.status(500).json({
          status: "error",
          message: "Failed to fetch GIF from Giphy",
        });
      }
    }
  }

  return res.json({
    status: "success",
    message,
    // message: `<div>${message}</div>`,
  });
});

export default router;
