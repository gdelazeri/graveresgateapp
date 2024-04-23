import { Icon } from "react-native-elements";
import colors from "@theme/colors";

interface IconProps {
  size: number;
}

const UserIcon = ({ size }: IconProps) => (
  <Icon
    name={"user-circle"}
    type={"font-awesome"}
    size={size}
    color={colors.Greyscale.b50}
    containerStyle={{
      padding: 0,
      margin: 0,
    }} />
);

export default UserIcon;
