import { render, fireEvent, act } from "@testing-library/react-native";
import Input from ".";
import { INPUT_TYPE } from "./types";

jest.useFakeTimers();

describe("Input", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with default values", async () => {
    const onChangeText = jest.fn();

    const { getByTestId } = render(
      <Input
        label="Label"
        placeholder="Placeholder"
        value={""}
        onChangeText={onChangeText}
        testID="input-test-id"
      />,
    );

    const input = getByTestId("input-test-id");

    fireEvent.changeText(input, "Test value");

    expect(onChangeText).toHaveBeenCalledWith("Test value");
  });

  it("should render correctly with invalid mode", async () => {
    const onChangeText = jest.fn();

    const { getByTestId, queryByText } = render(
      <Input
        label="Label"
        placeholder="Placeholder"
        value={""}
        onChangeText={onChangeText}
        testID="input-test-id"
        invalid={true}
        invalidText="Error message"
      />,
    );

    const input = getByTestId("input-test-id");

    await act(async () => {
      input.props.onFocus();
    });

    await act(async () => {
      input.props.onBlur();
    });

    expect(queryByText("Error message")).toBeDefined();
  });

  it("should render correctly with password type", async () => {
    const onChangeText = jest.fn();

    const { getByTestId, queryByText } = render(
      <Input
        label="Label"
        placeholder="Placeholder"
        value={""}
        onChangeText={onChangeText}
        type={INPUT_TYPE.PASSWORD}
        testID="input-test-id"
      />,
    );

    const input = getByTestId("input-test-id");
    fireEvent.changeText(input, "PasswordValue");

    expect(onChangeText).toHaveBeenCalledWith("PasswordValue");
    expect(queryByText("PasswordValue")).toBeFalsy();

    const eye = getByTestId("icon-secure-entry");
    fireEvent.press(eye);
  });

  it("should render correctly with phone type", async () => {
    const onChangeText = jest.fn();

    const { getByTestId, queryByText } = render(
      <Input
        label="Label"
        placeholder="Placeholder"
        value={""}
        onChangeText={onChangeText}
        type={INPUT_TYPE.PHONE}
        testID="input-test-id"
      />,
    );

    const input = getByTestId("input-test-id");
    fireEvent.changeText(input, "51999999999");

    expect(onChangeText).toHaveBeenCalledWith("51999999999");
    expect(queryByText("(51) 99999-9999")).toBeFalsy();
  });

  it("should render correctly with email type", async () => {
    const onChangeText = jest.fn();

    const { getByTestId, queryByText } = render(
      <Input
        label="Label"
        placeholder="Placeholder"
        value={""}
        onChangeText={onChangeText}
        type={INPUT_TYPE.EMAIL}
        testID="input-test-id"
      />,
    );

    const input = getByTestId("input-test-id");
    fireEvent.changeText(input, "teste@teste.com");

    expect(onChangeText).toHaveBeenCalledWith("teste@teste.com");
    expect(queryByText("teste@teste.com")).toBeFalsy();
  });
});
