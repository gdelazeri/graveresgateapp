import { Icon } from "react-native-elements";

interface IconProps {
  size?: number;
  color?: string;
}

const SignOutIcon = ({ size = 24, color }: IconProps) => (
  <Icon
    name={"logout"}
    size={size}
    color={color}
    containerStyle={{
      padding: 0,
      margin: 0,
    }}
  />
);

export default SignOutIcon;
