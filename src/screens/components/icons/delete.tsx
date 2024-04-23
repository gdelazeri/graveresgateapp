import { Icon } from "react-native-elements";

interface IconProps {
  size?: number;
  color: string;
}

const DeleteIcon = ({ size = 24, color }: IconProps) => (
  <Icon name="delete" size={size} color={color} />
);

export default DeleteIcon;
