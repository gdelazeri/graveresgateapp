import Label from "@screens/components/label";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";
import { User } from "@api/user/types";
import Avatar from "@screens/components/avatar";

interface DutyUserPositionProps {
  placeholder: string;
  label?: string;
  user?: User | null;
  onPress: () => void;
  disabled?: boolean
}

const DutyUserPosition = ({
  placeholder,
  label,
  user,
  onPress,
  disabled = false
}: DutyUserPositionProps) => {
  console.log({ user })
  return (
    <>
      {isString(label) && <Label size={'small'}>{label}</Label>}
      <Styled.Container onPress={onPress} disabled={disabled}>
        {user?.id !== null && (
          <Styled.UserData>
            <Styled.UserAvatar>
              <Avatar imageUrl={user?.imageUrl} size={24} />
            </Styled.UserAvatar>
            <Styled.Label>{user?.name}</Styled.Label>
          </Styled.UserData>
        )}
        {user?.id === null && isString(placeholder) && <Label size="medium" color={colors.Greyscale.b60}>{placeholder}</Label>}
      </Styled.Container>
    </>
  );
};

export default DutyUserPosition;
