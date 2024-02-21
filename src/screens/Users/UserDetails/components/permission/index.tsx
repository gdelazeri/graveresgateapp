import { UserPermission } from "@api/user";
import Chip from "@screens/components/chip";
import colors from "@theme/colors";

const PermissionMapperLabel = {
  [UserPermission.ADMIN]: 'Administrador',
  [UserPermission.TRAINEE]: 'Estagiario',
  [UserPermission.VOLUNTARY]: 'Voluntário'
}

interface UserDetailsPermissionProps {
  permission: UserPermission
}

const UserDetailsPermission = ({ permission }: UserDetailsPermissionProps) => (
  <Chip
    label={PermissionMapperLabel[permission]}
    labelColor={colors.black}
    backgroundColor={colors.Greyscale.b80}
  />
)

export default UserDetailsPermission;