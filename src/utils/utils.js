import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function getGif(keyword) {
  try {
    const apiKey = process.env.GIPHY_API_KEY;
    const limit = 10; // Increase the limit to get more GIFs
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: apiKey,
        q: keyword,
        limit: limit,
        rating: "g",
      },
    });

    const gifs = response.data.data;
    if (gifs.length > 0) {
      const randomIndex = Math.floor(Math.random() * gifs.length);
      return gifs[randomIndex].images.original.url;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Giphy API Error:", error.message);
    throw new Error("Failed to fetch GIF from Giphy");
  }
}
