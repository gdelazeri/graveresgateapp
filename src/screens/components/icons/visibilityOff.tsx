import { Icon } from "react-native-elements";

interface IconProps {
  size?: number;
  color: string;
}

const VisibilityOffIcon = ({ size, color }: IconProps) => (
  <Icon
    name={"visibility-off"}
    color={color}
    size={size}
  />
);

export default VisibilityOffIcon;
