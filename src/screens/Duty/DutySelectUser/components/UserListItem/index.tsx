import { UserDutyRequest } from "@api/user/types";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";

interface UserSelectListItemProps {
  user: UserDutyRequest;
  onPress?: () => void;
}

const UserSelectListItem = ({ user, onPress }: UserSelectListItemProps) => (
  <Styled.Touchable onPress={onPress} testID={`user-list-item-${user.id}`} activeOpacity={typeof onPress === 'function' ? 0.7 : 1}>
    <Avatar imageUrl={user.imageUrl} size={48} />
    <Styled.UserInfo>
      <Label size='medium'>{user.name}</Label>
      {user.dutyRequest && (
        <>
          <Styled.InlineTime>
            <Styled.TimeIcon />
            <Label size='small' color={colors.Greyscale.b50} noMarginBottom>
              {user.dutyRequest.startAt.substring(0, 5)} às {user.dutyRequest.endAt.substring(0, 5)}
            </Label>
          </Styled.InlineTime>
          {isString(user.dutyRequest.note) && (
            <Label size='small' color={colors.Greyscale.b50} noMarginBottom>
              Obs.: {user.dutyRequest.note}
            </Label>
          )}
        </>
      )}
    </Styled.UserInfo>
  </Styled.Touchable>
)

export default UserSelectListItem;