import { act, renderHook } from "@testing-library/react-native";

import { postLogin } from "@api/user";
import useSignIn from "@screens/loggedOff/SignIn/useSignIn";
import { useUserContext } from "@context/userContext";

jest.mock("@api/user", () => ({
  postLogin: jest.fn(),
}));
jest.mock("@context/userContext", () => ({
  useUserContext: jest.fn().mockImplementation(() => ({
    setTokens: jest.fn(),
  })),
}));

describe("useSignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.isEmailValid).toBeFalsy();
    expect(result.current.isPasswordValid).toBeFalsy();
    expect(result.current.isFormValid).toBeFalsy();
  });

  it("should trigger register method and save tokens", async () => {
    const setTokensMock = jest.fn();
    // @ts-ignore
    useUserContext.mockReturnValue({
      setTokens: setTokensMock,
    });

    // @ts-ignore
    postLogin.mockResolvedValueOnce({
      success: true,
      error: null,
      result: {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
    });

    const fullNameTest = "Full Name";
    const emailTest = "fullname@teste.com";
    const phoneTest = "(51) 99999-9999";
    const passwordTest = "Pass1234";

    const { result } = renderHook(() => useSignIn());

    await act(() => {
      result.current.setEmail(emailTest);
      result.current.setPassword(passwordTest);
    });

    await act(async () => {
      await result.current.login();
    });

    expect(postLogin).toHaveBeenCalledWith({
      email: emailTest,
      password: passwordTest,
    });
    expect(setTokensMock).toHaveBeenCalledWith({
      newAccessToken: "accessToken",
      newRefreshToken: "refreshToken",
    });
  });

  it("should trigger register method with error", async () => {
    // @ts-ignore
    postLogin.mockResolvedValueOnce(null);

    const emailTest = "fullname@teste.com";
    const passwordTest = "Pass1234";

    const { result } = renderHook(() => useSignIn());

    await act(() => {
      result.current.setEmail(emailTest);
      result.current.setPassword(passwordTest);
    });

    await act(async () => {
      await result.current.login();
    });

    expect(postLogin).toHaveBeenCalledWith({
      email: emailTest,
      password: passwordTest,
    });
  });
});
