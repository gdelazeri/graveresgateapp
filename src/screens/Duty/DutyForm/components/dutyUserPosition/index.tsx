import Label from "@screens/components/label";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";
import { User } from "@api/user/types";
import Avatar from "@screens/components/avatar";
import RequestsIndicator from "../requestsIndicator";

interface DutyUserPositionProps {
  placeholder: string;
  label?: string;
  user?: User | null;
  onPress: () => void;
  disabled?: boolean
  onRemove: () => void;
  requestsCount: number;
}

const DutyUserPosition = ({
  placeholder,
  label,
  user,
  onPress,
  disabled = false,
  onRemove,
  requestsCount,
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
              <Avatar imageUrl={user?.imageUrl} size={24} />
            </Styled.UserAvatar>
            <Label size={'medium'} numberOfLines={1}>{user?.name}</Label>
          </Styled.UserData>
        )}
        {isString(user?.id) && !disabled && (
          <Styled.IconContainer onPress={onRemove}>
            <Styled.RemoveIcon />
          </Styled.IconContainer>
        )}
        {!isString(user?.id) && isString(placeholder) && <Label size="medium" color={colors.Greyscale.b60}>{placeholder}</Label>}
      </Styled.Container>
    </>
  );
};

export default DutyUserPosition;
