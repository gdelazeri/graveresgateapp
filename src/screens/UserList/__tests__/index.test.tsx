import { render, waitFor } from "@testing-library/react-native";
import * as UserListScreen from "..";
import { SafeAreaProvider } from "react-native-safe-area-context";

jest.mock("@context/userContext", () => ({
  useUserContext: jest.fn().mockImplementation(() => ({
    userData: null,
  })),
}));

describe("UserListScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("UserList Tests", () => {
    it("should render correctly", async () => {
      const navigationMock = {
        navigate: jest.fn(),
      } as any;

      const {} = render(<UserListScreen.default navigation={navigationMock} />);
    });
  });

  describe("NavHeader", () => {
    it("should render correctly", async () => {
      const { queryByText } = render(
        <SafeAreaProvider
          initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
        >
          <UserListScreen.NavHeader />
        </SafeAreaProvider>);

      await waitFor(() => {
        expect(queryByText("Equipe")).toBeTruthy();
      });
    });
  });
});
