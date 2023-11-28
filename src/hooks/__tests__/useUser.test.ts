import { renderHook } from "@testing-library/react-native";

import useUser from "@hooks/useUser";
import storage, { STORAGE_KEYS } from "@utils/storage";

jest.mock("@utils/storage", () => ({
  get: jest.fn(),
  set: jest.fn(),
  STORAGE_KEYS: {
    ACCESS_TOKEN: "ACCESS_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
  },
}));

describe("useUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("call setTokens method", async () => {
    const { result } = renderHook(() => useUser());

    const accessToken = "token123";
    const refreshToken = "refresh123";

    await result.current.setTokens({
      accessToken,
      refreshToken,
    });

    expect(storage.set).toHaveBeenCalledWith(
      STORAGE_KEYS.ACCESS_TOKEN,
      accessToken,
    );
    expect(storage.set).toHaveBeenCalledWith(
      STORAGE_KEYS.REFRESH_TOKEN,
      refreshToken,
    );
  });

  it("call getTokens method", async () => {
    // @ts-ignore
    storage.get.mockResolvedValue("token123");

    const { result } = renderHook(() => useUser());

    const { accessToken, refreshToken } = await result.current.getTokens();

    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEYS.ACCESS_TOKEN);
    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEYS.REFRESH_TOKEN);
    expect(accessToken).toBe("token123");
    expect(refreshToken).toBe("token123");
  });
});
