import * as SecureStore from "expo-secure-store";
import storage from "../storage";

describe("storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("get", async () => {
    const getItemAsyncMock = jest.spyOn(SecureStore, "getItemAsync");

    await storage.get("key");

    expect(getItemAsyncMock).toHaveBeenCalledWith("key");
  });

  it("set", async () => {
    const setItemAsyncMock = jest.spyOn(SecureStore, "setItemAsync");

    await storage.set("key", "value");

    expect(setItemAsyncMock).toHaveBeenCalledWith("key", "value");
  });

  it("clear", async () => {
    const deleteItemAsyncMock = jest.spyOn(SecureStore, "deleteItemAsync");

    await storage.clear("key");

    expect(deleteItemAsyncMock).toHaveBeenCalledWith("key");
  });
});
