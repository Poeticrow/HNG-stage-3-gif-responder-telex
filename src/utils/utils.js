import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getGif(keyword) {
  try {
    const apiKey = process.env.GIPHY_API_KEY;
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: { api_key: apiKey, q: keyword, limit: 1 },
    });
    return response.data.data.length > 0 ? response.data.data[0].url : null;
  } catch (error) {
    console.error("Error fetching GIF:", error);
    return null;
  }
}

export { getGif };
