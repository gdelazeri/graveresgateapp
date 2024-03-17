import Label from "@screens/components/label";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";
import { User } from "@api/user/types";
import Avatar from "@screens/components/avatar";
import RequestsIndicator from "../requestsIndicator";
import { DutyRequest } from "@api/dutyRequest/types";

interface DutyUserPositionProps {
  placeholder: string;
  label?: string;
  user?: User | null;
  onPress: () => void;
  disabled?: boolean
  onRemove: () => void;
  requestsCount: number;
  dutyRequest?: DutyRequest;
}

const DutyUserPosition = ({
  placeholder,
  label,
  user,
  onPress,
  disabled = false,
  onRemove,
  requestsCount,
  dutyRequest,
}: DutyUserPositionProps) => {
  return (
    <>
      {isString(label) && <Styled.LabelContainer>
        <Label size={'small'}>{label}</Label>
        <RequestsIndicator count={requestsCount} />
      </Styled.LabelContainer>}
      <Styled.Container onPress={onPress} disabled={disabled}>
        {isString(user?.id) && (
          <Styled.UserData>
            <Styled.UserAvatar>
              <Avatar imageUrl={user?.imageUrl} size={32} />
            </Styled.UserAvatar>
            <Label size={'medium'} numberOfLines={1} noMarginBottom>{user?.name}</Label>
          </Styled.UserData>
        )}
        {isString(user?.id) && !disabled && (
          <Styled.IconContainer onPress={onRemove}>
            <Styled.RemoveIcon />
          </Styled.IconContainer>
        )}
        {!isString(user?.id) && isString(placeholder) && <Label size="medium" color={colors.Greyscale.b60} noMarginBottom>{placeholder}</Label>}
      </Styled.Container>
      {dutyRequest && (
        <Styled.DutyRequestInfoContainer>
          <Styled.Inline>
            <Styled.TimeIcon />
            <Label size={'small'} color={colors.Greyscale.b50}>{dutyRequest.startAt.substring(0,5)} às {dutyRequest.endAt.substring(0,5)}</Label>
          </Styled.Inline>
          {isString(dutyRequest.note) && <Label size={'small'} color={colors.Greyscale.b50} noMarginBottom>Obs.: {dutyRequest.note}</Label>}
        </Styled.DutyRequestInfoContainer>
      )}
    </>
  );
};

export default DutyUserPosition;
