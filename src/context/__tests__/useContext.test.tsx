import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import { UserProvider, useUserContext } from "@context/userContext";
import storage, { STORAGE_KEYS } from "@utils/storage";
import { Text, TouchableOpacity, View } from "react-native";
import { getUserData } from "@api/user/userApi";

jest.mock("@utils/storage", () => ({
  get: jest.fn(),
  set: jest.fn(),
  clear: jest.fn(),
  STORAGE_KEYS: {},
}));

jest.mock("@api/user", () => ({
  getUserData: jest.fn(),
}));

const TestComponent = () => {
  const { accessToken, refreshToken, signOut, setTokens } =
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
      <TouchableOpacity testID="signOut" onPress={signOut}>
        Clear tokens
      </TouchableOpacity>
    </View>
  );
};

describe("useUserContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set new token values", async () => {
    storage.get
      // @ts-ignore
      .mockResolvedValueOnce("tokenAccess123")
      .mockResolvedValueOnce("tokenRefresh123");

    // @ts-ignore
    getUserData.mockResolvedValueOnce({
      success: true,
      result: {
        name: "name",
        email: "email",
      },
    });

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
    expect(getUserData).toHaveBeenCalled();
  });

  it("should get state values", async () => {
    storage.get
      // @ts-ignore
      .mockResolvedValueOnce("tokenAccess123")
      .mockResolvedValueOnce("tokenRefresh123");

    // @ts-ignore
    getUserData.mockResolvedValueOnce({
      success: true,
      result: {
        name: "name",
        email: "email",
      },
    });

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
      fireEvent.press(getByTestId("signOut"));
    });

    await waitFor(() => {
      expect(queryByText("tokenAccess123")).toBeFalsy();
      expect(queryByText("tokenRefresh123")).toBeFalsy();
    });

    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEYS.ACCESS_TOKEN);
    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEYS.REFRESH_TOKEN);
    expect(storage.clear).toHaveBeenCalledWith(STORAGE_KEYS.ACCESS_TOKEN);
    expect(storage.clear).toHaveBeenCalledWith(STORAGE_KEYS.REFRESH_TOKEN);
    expect(getUserData).toHaveBeenCalled();
  });
});
