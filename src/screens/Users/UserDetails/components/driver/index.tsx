import Chip from "@screens/components/chip";
import colors from "@theme/colors";

interface UserDetailsDriverProps {
  isDriver: boolean
}

const UserDetailsDriver = ({ isDriver }: UserDetailsDriverProps) => (
  <Chip
    label={isDriver ? 'Sim' : 'Não'}
    labelColor={colors.black}
    backgroundColor={colors.Greyscale.b90}
  />
)

export default UserDetailsDriver;