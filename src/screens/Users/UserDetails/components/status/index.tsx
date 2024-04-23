import { UserStatus, UserStatusLabel } from "@api/user/types";
import Chip from "@screens/components/chip";
import colors from "@theme/colors";

const StatusMapperBackgroundColor = {
  [UserStatus.ACTIVE]: colors.green,
  [UserStatus.PENDING]: colors.yellow,
  [UserStatus.SUSPENDED]: colors.red,
  [UserStatus.DELETED]: colors.red,
};

const StatusMapperLabelColor = {
  [UserStatus.ACTIVE]: colors.Greyscale.b100,
  [UserStatus.PENDING]: colors.black,
  [UserStatus.SUSPENDED]: colors.Greyscale.b100,
  [UserStatus.DELETED]: colors.Greyscale.b100,
};

interface UserDetailsStatusProps {
  status: UserStatus;
}

const UserDetailsStatus = ({ status }: UserDetailsStatusProps) => (
  <Chip
    label={UserStatusLabel[status]}
    labelColor={StatusMapperLabelColor[status]}
    backgroundColor={StatusMapperBackgroundColor[status]}
  />
);

export default UserDetailsStatus;
