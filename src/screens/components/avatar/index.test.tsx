import { render } from "@testing-library/react-native";
import Avatar from ".";

describe("Avatar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly without image", async () => {
    const {} = render(<Avatar imageUrl={undefined} />);
  });

  it("should render correctly with image", async () => {
    const {} = render(<Avatar imageUrl="" />);
  });
});
