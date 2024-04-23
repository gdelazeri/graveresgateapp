import { UserDutyRequest, UserPermission } from "@api/user/types";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";
import Chip from "@screens/components/chip";
import TimeIcon from "@screens/components/icons/time";

interface UserSelectListItemProps {
  user: UserDutyRequest;
  onPress?: () => void;
}

const UserSelectListItem = ({ user, onPress }: UserSelectListItemProps) => (
  <Styled.Touchable
    onPress={onPress}
    testID={`user-list-item-${user.id}`}
    disabled={user.selected}
  >
    <Avatar imageUrl={user.imageUrl} size={48} />
    <Styled.UserInfo>
      <Label size="medium">{user.name}</Label>
      {user.dutyRequest && (
        <>
          <Styled.InlineTime>
            <TimeIcon color={colors.Greyscale.b50} />
            <Label size="small" color={colors.Greyscale.b50} noMarginBottom>
              {user.dutyRequest.startAt.substring(0, 5)} às{" "}
              {user.dutyRequest.endAt.substring(0, 5)}
            </Label>
          </Styled.InlineTime>
          {isString(user.dutyRequest.note) && (
            <Label size="small" color={colors.Greyscale.b50} noMarginBottom>
              Obs.: {user.dutyRequest.note}
            </Label>
          )}
        </>
      )}
      <Styled.Inline>
        {user.isLeader && (
          <Styled.ChipContainer>
            <Chip
              label="Líder"
              backgroundColor={colors.Greyscale.b90}
              labelColor={colors.black}
            />
          </Styled.ChipContainer>
        )}
        {user.isDriver && (
          <Styled.ChipContainer>
            <Chip
              label="Condutor"
              backgroundColor={colors.Greyscale.b90}
              labelColor={colors.black}
            />
          </Styled.ChipContainer>
        )}
        {user.permission === UserPermission.TRAINEE && (
          <Styled.ChipContainer>
            <Chip
              label={`Estagiário${
                user?.course ? ` - ${user.course.name}` : ""
              }`}
              backgroundColor={colors.Greyscale.b90}
              labelColor={colors.black}
            />
          </Styled.ChipContainer>
        )}
      </Styled.Inline>
    </Styled.UserInfo>
  </Styled.Touchable>
);

export default UserSelectListItem;
