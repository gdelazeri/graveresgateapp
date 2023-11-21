import { render, fireEvent } from "@testing-library/react-native";
import Input, { INPUT_TYPE } from ".";

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
        value={''}
        onChangeText={onChangeText}
      />
    );

    const input = getByTestId("input-test-id");

    fireEvent.changeText(input, 'Test value')

    expect(onChangeText).toHaveBeenCalledWith('Test value')
  });

  it("should render correctly with password type", async () => {
    const onChangeText = jest.fn();
    
    const { getByTestId, queryByText } = render(
      <Input
        label="Label"
        placeholder="Placeholder"
        value={''}
        onChangeText={onChangeText}
        type={INPUT_TYPE.PASSWORD}
      />
    );

    const input = getByTestId("input-test-id");
    fireEvent.changeText(input, 'PasswordValue')

    expect(onChangeText).toHaveBeenCalledWith('PasswordValue')
    expect(queryByText('PasswordValue')).toBeFalsy()

    const eye = getByTestId("icon-secure-entry");
    fireEvent.press(eye)
  });

  it("should render correctly with phone type", async () => {
    const onChangeText = jest.fn();
    
    const { getByTestId, queryByText } = render(
      <Input
        label="Label"
        placeholder="Placeholder"
        value={''}
        onChangeText={onChangeText}
        type={INPUT_TYPE.PHONE}
      />
    );

    const input = getByTestId("input-test-id");
    fireEvent.changeText(input, '51999999999')

    expect(onChangeText).toHaveBeenCalledWith('51999999999')
    expect(queryByText('(51) 99999-9999')).toBeFalsy()
  });

  it("should render correctly with email type", async () => {
    const onChangeText = jest.fn();
    
    const { getByTestId, queryByText } = render(
      <Input
        label="Label"
        placeholder="Placeholder"
        value={''}
        onChangeText={onChangeText}
        type={INPUT_TYPE.EMAIL}
      />
    );

    const input = getByTestId("input-test-id");
    fireEvent.changeText(input, 'teste@teste.com')

    expect(onChangeText).toHaveBeenCalledWith('teste@teste.com')
    expect(queryByText('teste@teste.com')).toBeFalsy()
  });
});
