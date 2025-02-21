import request from "supertest";
import app from "../src/app.js";
import dotenv from "dotenv";
dotenv.config();
import { jest } from "@jest/globals"; // Import Jest in ESM mode

// Mock the `getGif` function
jest.unstable_mockModule("../src/utils/utils.js", () => ({
  getGif: jest.fn(() => {
    throw new Error("Giphy API failed");
  }),
}));

describe("GIF Responder API Tests", () => {
  test("✅ Should return success with GIF when keyword matches", async () => {
    const response = await request(app)
      .post("/webhook")
      .send({
        message: "Hello happy world!",
        settings: [
          { label: "Giphy Api Key", default: process.env.GIPHY_API_KEY },
          { label: "Custom Keywords", default: "happy,sad,excited" },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toMatch(/<img src=/);
  });

  test("✅ Should return original message when no keyword matches", async () => {
    const response = await request(app)
      .post("/webhook")
      .send({
        message: "This is a random message",
        settings: [
          { label: "Giphy Api Key", default: process.env.GIPHY_API_KEY },
          { label: "Custom Keywords", default: "happy,sad,excited" },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toMatch(/<div>.*<\/div>/);
  });

  test("⚠ Should return 400 for missing message", async () => {
    const response = await request(app)
      .post("/webhook")
      .send({
        settings: [
          { label: "Giphy Api Key", default: process.env.GIPHY_API_KEY },
          { label: "Custom Keywords", default: "happy,sad,excited" },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
  });

  test("⚠ Should return 400 for invalid settings format", async () => {
    const response = await request(app).post("/webhook").send({
      message: "Hello world!",
      settings: "invalid-settings-format",
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
  });

  test("⚠ Should return error when Giphy API key is missing", async () => {
    const response = await request(app).post("/webhook").send({
      message: "hello",
      settings: [],
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Missing Giphy API key");
  });

  //   test("⚠ Should handle Giphy API failures gracefully", async () => {
  //     const response = await request(app)
  //       .post("/webhook")
  //       .send({
  //         message: "sad",
  //         settings: [
  //           { label: "Giphy Api Key", default: "valid-key" },
  //           { label: "Custom Keywords", default: "happy,sad,excited" },
  //         ],
  //       });

  //     expect(response.status).toBe(500);
  //     expect(response.body.status).toBe("error");
  //     expect(response.body.message).toBe("Failed to fetch GIF from Giphy");
  //   });
});
