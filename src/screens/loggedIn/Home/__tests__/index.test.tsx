import { render } from "@testing-library/react-native";
import Home from "..";

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const navigationMock = {
      navigate: jest.fn(),
    } as any;

    const { } = render(<Home navigation={navigationMock} />);
  });
});
