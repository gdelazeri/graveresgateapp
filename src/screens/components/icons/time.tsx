import { Icon } from "react-native-elements";

interface IconProps {
  size?: number;
  color?: string;
}

const TimeIcon = ({ size = 16, color }: IconProps) => (
  <Icon
    name={"access-time"}
    size={size}
    color={color}
    containerStyle={{
      padding: 0,
      margin: 0,
    }}
  />
);

export default TimeIcon;
