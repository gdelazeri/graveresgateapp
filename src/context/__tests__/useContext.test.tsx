import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import { UserProvider, useUserContext } from "@context/userContext";
import storage, { STORAGE_KEYS } from "@utils/storage";
import { Text, TouchableOpacity, View } from "react-native";

jest.mock("@utils/storage", () => ({
  get: jest.fn(),
  set: jest.fn(),
  clear: jest.fn(),
  STORAGE_KEYS: {},
}));

const TestComponent = () => {
  const { accessToken, refreshToken, clearTokens, setTokens } =
    useUserContext();

  return (
    <View>
      <Text>{accessToken}</Text>
      <Text>{refreshToken}</Text>
      <TouchableOpacity
        testID="setTokens"
        onPress={() =>
          setTokens({
            newAccessToken: "accessToken123",
            newRefreshToken: "refreshToken123",
          })
        }
      >
        Set tokens
      </TouchableOpacity>
      <TouchableOpacity testID="clearTokens" onPress={clearTokens}>
        Clear tokens
      </TouchableOpacity>
    </View>
  );
};

describe("useUserContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.only("should set new token values", async () => {
    storage.get
      // @ts-ignore
      .mockResolvedValueOnce("tokenAccess123")
      .mockResolvedValueOnce("tokenRefresh123");

    const { getByTestId, queryByText } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    await waitFor(() => {
      expect(queryByText("tokenAccess123")).toBeTruthy();
      expect(queryByText("tokenRefresh123")).toBeTruthy();
    });

    await act(() => {
      fireEvent.press(getByTestId("setTokens"));
    });

    await waitFor(() => {
      expect(queryByText("accessToken123")).toBeTruthy();
      expect(queryByText("refreshToken123")).toBeTruthy();
    });

    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEYS.ACCESS_TOKEN);
    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEYS.REFRESH_TOKEN);
  });

  it.only("should get state values", async () => {
    storage.get
      // @ts-ignore
      .mockResolvedValueOnce("tokenAccess123")
      .mockResolvedValueOnce("tokenRefresh123");

    const { getByTestId, queryByText } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    await waitFor(() => {
      expect(queryByText("tokenAccess123")).toBeTruthy();
      expect(queryByText("tokenRefresh123")).toBeTruthy();
    });

    await act(() => {
      fireEvent.press(getByTestId("clearTokens"));
    });

    await waitFor(() => {
      expect(queryByText("tokenAccess123")).toBeFalsy();
      expect(queryByText("tokenRefresh123")).toBeFalsy();
    });

    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEYS.ACCESS_TOKEN);
    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEYS.REFRESH_TOKEN);
    expect(storage.clear).toHaveBeenCalledWith(STORAGE_KEYS.ACCESS_TOKEN);
    expect(storage.clear).toHaveBeenCalledWith(STORAGE_KEYS.REFRESH_TOKEN);
  });
});
