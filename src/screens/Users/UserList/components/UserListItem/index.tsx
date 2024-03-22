import { User, UserStatus, UserStatusLabel } from "@api/user/types";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";
import Chip from "@screens/components/chip";
import colors from "@theme/colors";

interface UserListItemProps {
  user: User;
  onPress?: () => void;
}

const UserListItem = ({ user, onPress }: UserListItemProps) => (
  <Styled.Touchable onPress={onPress} testID={`user-list-item-${user.id}`} activeOpacity={typeof onPress === 'function' ? 0.7 : 1}>
    <Avatar imageUrl={user.imageUrl} />
    <Styled.UserInfo>
      <Label size='medium'>{user.name}</Label>
      {user.status !== UserStatus.ACTIVE && (
        <Chip
          label={UserStatusLabel[user.status]}
          backgroundColor={user.status === UserStatus.PENDING ? colors.yellow : colors.red}
          labelColor={user.status === UserStatus.PENDING ? colors.black : colors.Greyscale.b100}
        />
      )}
    </Styled.UserInfo>
  </Styled.Touchable>
)

export default UserListItem;