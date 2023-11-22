import { fireEvent, render } from "@testing-library/react-native";
import * as SignUp from "..";
import { SafeAreaProvider } from "react-native-safe-area-context";
import routeMap from "../../../../routes/routeMap";

describe("SignUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("SignUp tests", () => {
    it("should render correctly", async () => {
      const navigationMock = {
        navigate: jest.fn(),
      } as any;

      const { queryByText } = render(
        <SignUp.default navigation={navigationMock} />,
      );

      expect(
        queryByText("Preencha seus dados nos campos abaixo:"),
      ).toBeTruthy();
    });

    it("should fill inputs and press continue button", async () => {
      const navigationMock = {
        navigate: jest.fn(),
      } as any;

      const { getByTestId } = render(
        <SignUp.default navigation={navigationMock} />,
      );

      const fullName = "Full Name";
      const email = "fullname@teste.com";
      const phone = "(51) 99999-9999";
      const password = "Pass1234";

      fireEvent.changeText(getByTestId("full-name-input"), fullName);
      fireEvent.changeText(getByTestId("email-input"), email);
      fireEvent.changeText(getByTestId("phone-input"), phone);
      fireEvent.changeText(getByTestId("password-input"), password);
      fireEvent.changeText(getByTestId("password-confirm-input"), password);

      fireEvent.press(getByTestId("continue-btn"));

      expect(navigationMock.navigate).toHaveBeenCalledWith(
        routeMap.LoggedOffRoutes.SIGN_UP_VERIFICATION,
        {
          fullName: "Full Name",
          email: "fullname@teste.com",
          phone: phone.replace(/\D+/g, ""),
          password,
        },
      );
    });
  });

  describe("NavHeader tests", () => {
    it("should render correctly", async () => {
      const navigationMock = {
        navigate: jest.fn(),
      } as any;

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
