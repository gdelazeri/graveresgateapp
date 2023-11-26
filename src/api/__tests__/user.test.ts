import { postRegister } from "../user";
import request from "../request";

jest.mock("../request", () => ({
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
      request.post.mockResolvedValue(responseMock);

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
      request.post.mockRejectedValue({});

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
});
