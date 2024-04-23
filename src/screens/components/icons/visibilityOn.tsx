import { Icon } from "react-native-elements";

interface IconProps {
  size?: number;
  color: string;
}

const VisibilityOnIcon = ({ size, color }: IconProps) => (
  <Icon
    name={"visibility"}
    color={color}
    size={size}
  />
);

export default VisibilityOnIcon;
