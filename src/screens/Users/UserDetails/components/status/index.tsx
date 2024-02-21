import { UserStatus } from "@api/user";
import Chip from "@screens/components/chip";
import colors from "@theme/colors";

const StatusMapperLabel = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.PENDING]: 'Pendente',
  [UserStatus.SUSPENDED]: 'Suspenso',
  [UserStatus.DELETED]: 'Excluído',
}

const StatusMapperBackgroundColor = {
  [UserStatus.ACTIVE]: colors.green,
  [UserStatus.PENDING]: colors.yellow,
  [UserStatus.SUSPENDED]: colors.Greyscale.b50,
  [UserStatus.DELETED]: colors.red,
}

const StatusMapperLabelColor = {
  [UserStatus.ACTIVE]: colors.Greyscale.b100,
  [UserStatus.PENDING]: colors.black,
  [UserStatus.SUSPENDED]: colors.black,
  [UserStatus.DELETED]: colors.Greyscale.b100,
}

interface UserDetailsStatusProps {
  status: UserStatus
}

const UserDetailsStatus = ({ status }: UserDetailsStatusProps) => (
  <Chip
    label={StatusMapperLabel[status]}
    labelColor={StatusMapperLabelColor[status]}
    backgroundColor={StatusMapperBackgroundColor[status]}
  />
)

export default UserDetailsStatus;