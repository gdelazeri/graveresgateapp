import { render, fireEvent } from "@testing-library/react-native";
import Welcome from "..";
import routeMap from "@routes/routeMap";

describe("Welcome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const navigationMock = {
      navigate: jest.fn(),
    } as any;

    const { getByText } = render(<Welcome navigation={navigationMock} />);

    const btnLogin = getByText("Fazer login");
    const btnCreateAccount = getByText("Criar conta");

    fireEvent.press(btnLogin);
    fireEvent.press(btnCreateAccount);

    expect(navigationMock.navigate).toHaveBeenCalledWith(
      routeMap.LoggedOffRoutes.SIGN_UP,
    );
    expect(navigationMock.navigate).toHaveBeenCalledWith(
      routeMap.LoggedOffRoutes.SIGN_IN,
    );
  });
});
