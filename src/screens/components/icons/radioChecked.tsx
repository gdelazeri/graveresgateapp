import { Icon } from "react-native-elements";

interface IconProps {
  size: number;
  color: string;
}

const RadioButtonChecked = ({ size, color }: IconProps) => (
  <Icon type={"material"} name={"check-circle"} size={size} color={color} />
);

export default RadioButtonChecked;
