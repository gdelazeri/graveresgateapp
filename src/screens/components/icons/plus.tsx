import { Icon } from "react-native-elements";

interface IconProps {
  size?: number;
  color: string;
}

const PlusIcon = ({ size = 32, color }: IconProps) => (
  <Icon
    name="add-circle"
    size={size}
    color={color}
  />
);

export default PlusIcon;
