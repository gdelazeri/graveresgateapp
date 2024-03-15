import { User } from "@api/user/types";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";

interface UserSelectListItemProps {
  user: User;
  onPress?: () => void;
}

const UserSelectListItem = ({ user, onPress }: UserSelectListItemProps) => (
  <Styled.Touchable onPress={onPress} testID={`user-list-item-${user.id}`} activeOpacity={typeof onPress === 'function' ? 0.7 : 1}>
    <Avatar imageUrl={user.imageUrl} />
    <Styled.UserInfo>
      <Label size='medium'>{user.name}</Label>
    </Styled.UserInfo>
  </Styled.Touchable>
)

export default UserSelectListItem;