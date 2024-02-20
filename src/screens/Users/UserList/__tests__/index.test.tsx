import { render, waitFor } from "@testing-library/react-native";
import * as UserListScreen from "..";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUserList } from "../useUserList";

jest.mock("@screens/UserList/useUserList", () => ({
  useUserList: jest.fn().mockImplementation(() => ({
    list: [],
    isLoading: true,
    searchQuery: '',
    setSearchQuery: jest.fn()
  })),
}));

const navigationMock = {
  navigate: jest.fn(),
} as any;

describe("UserListScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("UserList Tests", () => {
    it("should render correctly with loading state", async () => {
      const {} = render(<UserListScreen.default navigation={navigationMock} />);
    });

    it("should render correctly with data", async () => {
      // @ts-ignore
      useUserList.mockImplementationOnce(() => ({
        list: [{ id: 'id', name: 'name', email: 'email' }],
        isLoading: false,
        searchQuery: '',
        setSearchQuery: jest.fn()
      }))

      const {} = render(<UserListScreen.default navigation={navigationMock} />);
    });
  });

  describe("NavHeader", () => {
    it("should render correctly", async () => {
      const { queryByText } = render(
        <SafeAreaProvider
          initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
        >
          <UserListScreen.NavHeader navigation={navigationMock} />
        </SafeAreaProvider>);

      await waitFor(() => {
        expect(queryByText("Equipe")).toBeTruthy();
      });
    });
  });
});
