import { act, fireEvent, render } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SignUp from "..";
import useUser from "../../../../hooks/useUser";
import { removePhoneMask } from "./../../../../utils/stringHelper";

jest.mock('../../../../hooks/useUser', () => jest.fn().mockImplementation(() => ({
  register: jest.fn()
})))

jest.useFakeTimers()

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
      const registerFunctionMock = jest.fn()
      // @ts-ignore
      useUser.mockReturnValue({
        register: registerFunctionMock
      })

      const { getByTestId, queryByTestId } = render(
        <SignUp.default navigation={navigationMock} />,
      );

      // try to press continue button
      await act(async () => {
        fireEvent.press(getByTestId("continue-btn"));
      })

      expect(registerFunctionMock).not.toHaveBeenCalled();
      expect(getByTestId("continue-btn").props.accessibilityState.disabled).toBeTruthy();
    });

    it("should fill inputs and press continue button", async () => {
      const registerFunctionMock = jest.fn()
      // @ts-ignore
      useUser.mockReturnValue({
        register: registerFunctionMock
      })

      const { getByTestId, queryByTestId } = render(
        <SignUp.default navigation={navigationMock} />,
      );

      const fullName = "Full Name";
      const email = "fullname@teste.com";
      const phone = "(51) 99999-9999";
      const password = "Pass1234";

      // fill inputs
      await act(async () => {
        fireEvent.changeText(getByTestId("full-name-input"), fullName);
        fireEvent.changeText(getByTestId("email-input"), email);
        fireEvent.changeText(getByTestId("phone-input"), phone);
        fireEvent.changeText(getByTestId("password-input"), password);
        fireEvent.changeText(getByTestId("password-confirm-input"), password);
      })

      // check inputs
      expect(queryByTestId("full-name-input").props.value).toBe(fullName)
      expect(queryByTestId("email-input").props.value).toBe(email)
      expect(queryByTestId("phone-input").props.value).toBe(phone)
      expect(queryByTestId("password-input").props.value).toBe(password)
      expect(queryByTestId("password-confirm-input").props.value).toBe(password)

      // press continue button
      await act(async () => {
        fireEvent.press(getByTestId("continue-btn"));
      })

      // check register method called
      expect(registerFunctionMock).toHaveBeenCalledWith({
        name: fullName,
        email,
        phone: removePhoneMask(phone),
        password
      });
      expect(getByTestId("continue-btn").props.accessibilityState.disabled).toBeFalsy();
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
