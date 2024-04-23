import Chip from "@screens/components/chip";
import colors from "@theme/colors";

interface UserDetailsLeaderProps {
  isLeader: boolean;
}

const UserDetailsLeader = ({ isLeader }: UserDetailsLeaderProps) => (
  <Chip
    label={isLeader ? "Sim" : "Não"}
    labelColor={colors.black}
    backgroundColor={colors.Greyscale.b90}
  />
);

export default UserDetailsLeader;
