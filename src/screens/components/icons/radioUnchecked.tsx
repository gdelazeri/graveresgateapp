import { Icon } from "react-native-elements";

interface IconProps {
  size: number;
  color: string;
}

const RadioButtonUnchecked = ({ size, color }: IconProps) => (
  <Icon
    type={"material"}
    name={"radio-button-unchecked"}
    size={size}
    color={color}
  />
);

export default RadioButtonUnchecked;
