import { IUser } from "@api/user";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";

interface UserListItemProps {
  user: IUser;
  onPress?: () => void;
}

const UserListItem = ({ user, onPress }: UserListItemProps) => (
  <Styled.Touchable onPress={onPress} testID={`user-list-item-${user.id}`}>
    <Avatar imageUrl={user.imageUrl} />
    <Styled.UserInfo>
      <Label size='medium'>{user.name}</Label>
      <Label size='small'>{user.email}</Label>
    </Styled.UserInfo>
  </Styled.Touchable>
)

export default UserListItem;