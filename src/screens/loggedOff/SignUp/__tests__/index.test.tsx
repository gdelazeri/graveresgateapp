import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SignUp from "..";
import useSignUp from "@screens/loggedOff/SignUp/useSignUp";

jest.mock("@screens/loggedOff/SignUp/useSignUp", () =>
  jest.fn().mockImplementation(() => ({
    register: jest.fn(),
    fullName: "",
    setFullName: jest.fn(),
    email: "",
    setEmail: jest.fn(),
    phone: "",
    setPhone: jest.fn(),
    password: "",
    setPassword: jest.fn(),
    passwordConfirm: "",
    setPasswordConfirm: jest.fn(),
    isProcessing: true,
    isFullNameValid: true,
    isEmailValid: true,
    isPhoneValid: true,
    isPasswordValid: true,
    isPasswordsEqual: true,
    isFormValid: true,
  })),
);

const navigationMock = {
  navigate: jest.fn(),
} as any;

describe("SignUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("SignUp tests", () => {
    it("should render correctly", async () => {
      const { queryByText } = render(
        <SignUp.default navigation={navigationMock} />,
      );

      expect(
        queryByText("Preencha seus dados nos campos abaixo:"),
      ).toBeTruthy();
    });

    it("should press continue button with non valid inputs", async () => {
      const registerFunctionMock = jest.fn();
      // @ts-ignore
      useSignUp.mockReturnValue({
        register: registerFunctionMock,
      });

      const { getByTestId } = render(
        <SignUp.default navigation={navigationMock} />,
      );

      // try to press continue button
      await act(async () => {
        fireEvent.press(getByTestId("continue-btn"));
      });

      expect(registerFunctionMock).not.toHaveBeenCalled();
      expect(
        getByTestId("continue-btn").props.accessibilityState.disabled,
      ).toBeTruthy();
    });

    it("should fill inputs and press continue button", async () => {
      const registerFunctionMock = jest.fn();
      const fullName = "Full Name";
      const email = "fullname@teste.com";
      const phone = "(51) 99999-9999";
      const password = "Pass1234";
      const isFormValid = true;

      // @ts-ignore
      useSignUp.mockReturnValueOnce({
        register: registerFunctionMock,
        fullName,
        email,
        phone,
        password,
        passwordConfirm: password,
        isFormValid,
      });

      const { getByTestId } = render(
        <SignUp.default navigation={navigationMock} />,
      );

      // press continue button
      await act(async () => {
        fireEvent.press(getByTestId("continue-btn"));
      });

      expect(registerFunctionMock).toHaveBeenCalled();
      expect(
        getByTestId("continue-btn").props.accessibilityState.disabled,
      ).toBeFalsy();
    });
  });

  describe("NavHeader tests", () => {
    it("should render correctly", async () => {
      const { queryByText } = render(
        <SafeAreaProvider
          initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
        >
          <SignUp.NavHeader navigation={navigationMock} />
        </SafeAreaProvider>,
      );

      expect(queryByText("Criar conta")).toBeTruthy();
    });
  });
});
