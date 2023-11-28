import axios from "axios";
import { get, post, put } from "@api/request";
import useUser from "@hooks/useUser";

const API_URL_TEST = "https://graveapi.com.br";

jest.mock("axios");
jest.mock("@utils/environment", () => ({
  API_URL: API_URL_TEST,
}));
jest.mock("@utils/storage", () => ({
  get: jest.fn(),
  set: jest.fn(),
  STORAGE_KEYS: {},
}));
jest.mock("@hooks/useUser", () =>
  jest.fn().mockImplementation(() => ({
    getTokens: jest.fn().mockResolvedValue({
      accessToken: "",
      refreshToken: "",
    }),
  })),
);

describe("request", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should request a axios.get with access token", async () => {
      // @ts-ignore
      useUser.mockReturnValueOnce({
        getTokens: jest.fn().mockResolvedValueOnce({ accessToken: "token123" }),
      });

      await get("/url");

      expect(axios.get).toHaveBeenCalledWith("/url", {
        baseURL: API_URL_TEST,
        headers: { Authorization: "Bearer token123" },
      });
    });

    it("should request a axios.get without access token", async () => {
      await get("/url");

      expect(axios.get).toHaveBeenCalledWith("/url", {
        baseURL: API_URL_TEST,
        headers: { Authorization: "" },
      });
    });
  });

  describe("post", () => {
    it("should request a axios.post with access token", async () => {
      // @ts-ignore
      useUser.mockReturnValueOnce({
        getTokens: jest.fn().mockResolvedValueOnce({ accessToken: "token123" }),
      });

      await post("/url", { name: "Test" });

      expect(axios.post).toHaveBeenCalledWith(
        "/url",
        { name: "Test" },
        {
          baseURL: API_URL_TEST,
          headers: { Authorization: "Bearer token123" },
        },
      );
    });

    it("should request a axios.post without access token", async () => {
      await post("/url", { name: "Test" });

      expect(axios.post).toHaveBeenCalledWith(
        "/url",
        { name: "Test" },
        {
          baseURL: API_URL_TEST,
          headers: { Authorization: "" },
        },
      );
    });
  });

  describe("put", () => {
    it("should request a axios.put with access token", async () => {
      // @ts-ignore
      useUser.mockReturnValueOnce({
        getTokens: jest.fn().mockResolvedValueOnce({ accessToken: "token123" }),
      });

      await put("/url/123", { name: "Test" });

      expect(axios.put).toHaveBeenCalledWith(
        "/url/123",
        { name: "Test" },
        {
          baseURL: API_URL_TEST,
          headers: { Authorization: "Bearer token123" },
        },
      );
    });

    it("should request a axios.put without access token", async () => {
      await put("/url/123", { name: "Test" });

      expect(axios.put).toHaveBeenCalledWith(
        "/url/123",
        { name: "Test" },
        {
          baseURL: API_URL_TEST,
          headers: { Authorization: "" },
        },
      );
    });
  });
});
