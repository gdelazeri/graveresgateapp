import { render, fireEvent } from "@testing-library/react-native";
import Header from ".";
import { SafeAreaProvider } from "react-native-safe-area-context";

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const onPressMock = jest.fn();

    const { queryByText, getByTestId } = render(
      <SafeAreaProvider
        initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
      >
        <Header title="Header" onBackPress={onPressMock} />
      </SafeAreaProvider>,
    );

    const headerText = queryByText("Header");

    fireEvent.press(getByTestId("back-action"));

    expect(headerText).toBeTruthy();
    expect(onPressMock).toHaveBeenCalled();
  });
});
