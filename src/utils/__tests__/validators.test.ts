import { isString, isEmail } from "../validators";

describe("validators", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("isString", () => {
    it("should validate a string", async () => {
      expect(isString("test")).toBeTruthy();
    });

    it("should not validate a string", async () => {
      expect(isString("")).toBeFalsy();
      expect(isString(null)).toBeFalsy();
      expect(isString(undefined)).toBeFalsy();
      expect(isString(1)).toBeFalsy();
    });
  });

  describe("isEmail", () => {
    it("should validate an email", async () => {
      expect(isEmail("test@gmail.com")).toBeTruthy();
    });

    it("should not validate an email", async () => {
      expect(isEmail("teste")).toBeFalsy();
      expect(isEmail("")).toBeFalsy();
      expect(isEmail(null)).toBeFalsy();
      expect(isEmail(undefined)).toBeFalsy();
      expect(isEmail(1)).toBeFalsy();
    });
  });
});
