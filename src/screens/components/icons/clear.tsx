import { Icon } from "react-native-elements";

interface IconProps {
  size?: number;
  color: string;
}

const ClearIcon = ({ size = 20, color }: IconProps) => (
  <Icon
    name={"clear"}
    size={size}
    color={color}
    containerStyle={{
      padding: 0,
      margin: 0,
    }}
  />
);

export default ClearIcon;
