import { User } from "@api/user/types";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";

interface UserListItemProps {
  user: User;
  onPress?: () => void;
}

const UserListItem = ({ user, onPress }: UserListItemProps) => (
  <Styled.Touchable onPress={onPress} testID={`user-list-item-${user.id}`} activeOpacity={typeof onPress === 'function' ? 0.7 : 1}>
    <Avatar imageUrl={user.imageUrl} />
    <Styled.UserInfo>
      <Label size='medium'>{user.name}</Label>
      <Label size='small'>{user.email}</Label>
    </Styled.UserInfo>
  </Styled.Touchable>
)

export default UserListItem;