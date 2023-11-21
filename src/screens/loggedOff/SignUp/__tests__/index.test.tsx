import { render } from "@testing-library/react-native";
import * as SignUp from "..";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
