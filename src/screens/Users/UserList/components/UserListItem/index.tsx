import { User } from "@api/user/types";
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
      {(user.isLeader || user.isDriver) && (
        <Styled.Inline>
          {user.isLeader && (
            <Styled.ChipContainer>
              <Chip label="Líder" backgroundColor={colors.Greyscale.b90} labelColor={colors.black} />
            </Styled.ChipContainer>
          )}
          {user.isDriver && (
            <Styled.ChipContainer>
              <Chip label="Condutor" backgroundColor={colors.Greyscale.b90} labelColor={colors.black} />
            </Styled.ChipContainer>
          )}
        </Styled.Inline>
      )}
    </Styled.UserInfo>
  </Styled.Touchable>
)

export default UserListItem;