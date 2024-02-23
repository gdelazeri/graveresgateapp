import { act, renderHook } from "@testing-library/react-native";

import { postRegister } from "@api/user/userApi";
import { removePhoneMask } from "@utils/stringHelper";
import useSignUp from "@screens/SignUp/useSignUp";
import { useUserContext } from "@context/userContext";

jest.mock("@api/user", () => ({
  postRegister: jest.fn(),
}));
jest.mock("@context/userContext", () => ({
  useUserContext: jest.fn().mockImplementation(() => ({
    setTokens: jest.fn(),
  })),
}));

describe("useSignUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const { result } = renderHook(() => useSignUp());

    expect(result.current.fullName).toBe("");
    expect(result.current.email).toBe("");
    expect(result.current.phone).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.passwordConfirm).toBe("");
    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.isFullNameValid).toBeFalsy();
    expect(result.current.isEmailValid).toBeFalsy();
    expect(result.current.isPhoneValid).toBeFalsy();
    expect(result.current.isPasswordValid).toBeFalsy();
    expect(result.current.isPasswordsEqual).toBeTruthy();
    expect(result.current.isFormValid).toBeFalsy();
  });

  it("should trigger register method and save tokens", async () => {
    const setTokensMock = jest.fn();
    // @ts-ignore
    useUserContext.mockReturnValue({
      setTokens: setTokensMock,
    });

    // @ts-ignore
    postRegister.mockResolvedValueOnce({
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

    const { result } = renderHook(() => useSignUp());

    await act(() => {
      result.current.setFullName(fullNameTest);
      result.current.setEmail(emailTest);
      result.current.setPhone(phoneTest);
      result.current.setPassword(passwordTest);
      result.current.setPasswordConfirm(passwordTest);
    });

    await act(async () => {
      await result.current.register();
    });

    expect(postRegister).toHaveBeenCalledWith({
      name: fullNameTest,
      email: emailTest,
      phone: removePhoneMask(phoneTest),
      password: passwordTest,
    });
    expect(setTokensMock).toHaveBeenCalledWith({
      newAccessToken: "accessToken",
      newRefreshToken: "refreshToken",
    });
  });

  it("should trigger register method with error", async () => {
    // @ts-ignore
    postRegister.mockResolvedValueOnce(null);

    const fullNameTest = "Full Name";
    const emailTest = "fullname@teste.com";
    const phoneTest = "(51) 99999-9999";
    const passwordTest = "Pass1234";

    const { result } = renderHook(() => useSignUp());

    await act(() => {
      result.current.setFullName(fullNameTest);
      result.current.setEmail(emailTest);
      result.current.setPhone(phoneTest);
      result.current.setPassword(passwordTest);
      result.current.setPasswordConfirm(passwordTest);
    });

    await act(async () => {
      await result.current.register();
    });

    expect(postRegister).toHaveBeenCalledWith({
      name: fullNameTest,
      email: emailTest,
      phone: removePhoneMask(phoneTest),
      password: passwordTest,
    });
  });
});
