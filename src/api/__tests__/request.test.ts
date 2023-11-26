import axios from "axios";
import request from "../request";

const API_URL_TEST = "https://graveapi.com.br";

jest.mock("axios");
jest.mock("../../utils/environment", () => ({
  API_URL: API_URL_TEST,
}));

describe("request", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should request a get with axios", async () => {
      await request.get("/url");

      expect(axios.get).toHaveBeenCalledWith("/url", {
        baseURL: API_URL_TEST,
        headers: { Authorization: "Bearer " },
      });
    });
  });

  describe("post", () => {
    it("should request a post with axios", async () => {
      await request.post("/url", { name: "Test" });

      expect(axios.post).toHaveBeenCalledWith(
        "/url",
        { name: "Test" },
        {
          baseURL: API_URL_TEST,
          headers: { Authorization: "Bearer " },
        },
      );
    });
  });

  describe("put", () => {
    it("should request a put with axios", async () => {
      await request.put("/url/123", { name: "Test" });

      expect(axios.put).toHaveBeenCalledWith(
        "/url/123",
        { name: "Test" },
        {
          baseURL: API_URL_TEST,
          headers: { Authorization: "Bearer " },
        },
      );
    });
  });
});
