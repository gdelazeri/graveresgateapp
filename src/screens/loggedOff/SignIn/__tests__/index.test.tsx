import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SignIn from "..";
import useSignIn from "@screens/loggedOff/SignIn/useSignIn";

jest.useFakeTimers();

jest.mock("@screens/loggedOff/SignIn/useSignIn.ts", () =>
  jest.fn().mockImplementation(() => ({
    login: jest.fn(),
    email: "",
    setEmail: jest.fn(),
    password: "",
    isProcessing: true,
    isEmailValid: true,
    isPasswordValid: true,
    isFormValid: true,
  })),
);

const navigationMock = {
  navigate: jest.fn(),
} as any;

describe("SignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("SignIn tests", () => {
    it("should render correctly", async () => {
      const { queryByText } = render(
        <SignIn.default navigation={navigationMock} />,
      );

      expect(
        queryByText("Informe seus dados de acesso:"),
      ).toBeTruthy();
    });

    it("should press continue button with non valid inputs", async () => {
      const loginFunctionMock = jest.fn();
      // @ts-ignore
      useSignIn.mockReturnValue({
        register: loginFunctionMock,
      });

      const { getByTestId } = render(
        <SignIn.default navigation={navigationMock} />,
      );

      // try to press continue button
      await act(async () => {
        fireEvent.press(getByTestId("sign-in-btn"));
      });

      expect(loginFunctionMock).not.toHaveBeenCalled();
      expect(
        getByTestId("sign-in-btn").props.accessibilityState.disabled,
      ).toBeTruthy();
    });

    it("should fill inputs and press continue button", async () => {
      const loginFunctionMock = jest.fn();
      const email = "fullname@teste.com";
      const password = "Pass1234";
      const isFormValid = true;

      // @ts-ignore
      useSignIn.mockReturnValueOnce({
        login: loginFunctionMock,
        email,
        password,
        passwordConfirm: password,
        isFormValid,
      });

      const { getByTestId } = render(
        <SignIn.default navigation={navigationMock} />,
      );

      // press continue button
      await act(async () => {
        fireEvent.press(getByTestId("sign-in-btn"));
      });

      expect(loginFunctionMock).toHaveBeenCalled();
      expect(
        getByTestId("sign-in-btn").props.accessibilityState.disabled,
      ).toBeFalsy();
    });
  });

  describe("NavHeader tests", () => {
    it("should render correctly", async () => {
      const { queryByText } = render(
        <SafeAreaProvider
          initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
        >
          <SignIn.NavHeader navigation={navigationMock} />
        </SafeAreaProvider>,
      );

      expect(queryByText("Fazer login")).toBeTruthy();
    });
  });
});
