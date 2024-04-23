import { render, fireEvent, act } from "@testing-library/react-native";
import SearchBar from ".";

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly and change search query value", async () => {
    const onChangeValue = jest.fn();

    const { getByTestId, queryByText } = render(
      <SearchBar
        placeholder="Search here..."
        value=""
        onChangeText={onChangeValue}
      />,
    );

    await act(() => {
      fireEvent.changeText(getByTestId("search-bar"), "searching...");
    });

    expect(onChangeValue).toHaveBeenCalledWith("searching...");
  });
});
