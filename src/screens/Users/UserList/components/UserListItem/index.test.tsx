import { fireEvent, render } from "@testing-library/react-native";
import { User } from "@api/user/types";
import UserListItem from ".";

describe("UserListItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const onPressMock = jest.fn();

    const { queryByText, getByTestId } = render(
      <UserListItem user={{ id: 'id', name: 'User Name', email: 'User E-mail' } as User} onPress={onPressMock} />
    );

    expect(queryByText('User Name')).toBeTruthy();
    expect(queryByText('User E-mail')).toBeTruthy();

    fireEvent.press(getByTestId('user-list-item-id'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
