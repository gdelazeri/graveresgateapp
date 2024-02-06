import { render, waitFor } from "@testing-library/react-native";
import * as Home from "..";
import { useUserContext } from "@context/userContext";

jest.mock("@context/userContext", () => ({
  useUserContext: jest.fn().mockImplementation(() => ({
    userData: null,
  })),
}));

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Home Tests", () => {
    it("should render correctly", async () => {
      const navigationMock = {
        navigate: jest.fn(),
      } as any;

      const {} = render(<Home.default navigation={navigationMock} />);
    });
  });

  describe("NavHeader", () => {
    it("should render correctly", async () => {
      // @ts-ignore
      useUserContext.mockReturnValueOnce({
        userData: {
          name: "name",
          email: "email",
        },
      });

      const { queryByText } = render(<Home.NavHeader />);

      await waitFor(() => {
        expect(queryByText("Olá, name")).toBeTruthy();
      });
    });
  });
});
