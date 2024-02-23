import { UserPermission, UserPermissionLabel } from "@api/user/userApi";
import Chip from "@screens/components/chip";
import colors from "@theme/colors";

interface UserDetailsPermissionProps {
  permission: UserPermission
}

const UserDetailsPermission = ({ permission }: UserDetailsPermissionProps) => (
  <Chip
    label={UserPermissionLabel[permission]}
    labelColor={colors.black}
    backgroundColor={colors.Greyscale.b90}
  />
)

export default UserDetailsPermission;