import { postRegister, postLogin, getUserData } from "@api/user/userApi";
import { get, post } from "@api/request";

jest.mock("@api/request", () => ({
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
}));

describe("user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("postRegister", () => {
    it("should register with success", async () => {
      const responseMock = {
        data: { accessToken: "accessToken", refreshToken: "refreshToken" },
      };
      // @ts-ignore
      post.mockResolvedValue(responseMock);

      const payload = {
        name: "name",
        email: "email",
        phone: "phone",
        password: "password",
      };

      const response = await postRegister(payload);

      expect(response).toBe(responseMock.data);
    });

    it("should register with error", async () => {
      // @ts-ignore
      post.mockRejectedValue({});

      const payload = {
        name: "name",
        email: "email",
        phone: "phone",
        password: "password",
      };

      const response = await postRegister(payload);

      expect(response).toBe(null);
    });
  });

  describe("postLogin", () => {
    it("should register with success", async () => {
      const responseMock = {
        data: { accessToken: "accessToken", refreshToken: "refreshToken" },
      };
      // @ts-ignore
      post.mockResolvedValue(responseMock);

      const payload = {
        email: "email",
        password: "password",
      };

      const response = await postLogin(payload);

      expect(response).toBe(responseMock.data);
    });

    it("should register with error", async () => {
      // @ts-ignore
      post.mockRejectedValue({});

      const payload = {
        email: "email",
        password: "password",
      };

      const response = await postLogin(payload);

      expect(response).toBe(null);
    });
  });

  describe("getUserData", () => {
    it("should get data with success", async () => {
      const responseMock = {
        data: { name: "Test", email: "test@test.com" },
      };
      // @ts-ignore
      get.mockResolvedValue(responseMock);

      const response = await getUserData();

      expect(response).toBe(responseMock.data);
    });

    it("should get data with error", async () => {
      // @ts-ignore
      get.mockRejectedValue({});

      const response = await getUserData();

      expect(response).toBe(null);
    });
  });
});
