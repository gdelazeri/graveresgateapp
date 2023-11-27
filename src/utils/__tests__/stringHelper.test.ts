import { isString, isEmail, removePhoneMask } from "../stringHelper";

describe("stringHelper", () => {
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

  describe("removePhoneMask", () => {
    it("should remove phone mask", async () => {
      expect(removePhoneMask("(51) 99999-9999")).toBe("51999999999");
      expect(removePhoneMask("51999999999")).toBe("51999999999");
    });
  });
});
