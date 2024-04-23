import { Icon } from "react-native-elements";
import { IconSizeType, IconSizeValue } from "./types";

interface IconProps {
  size?: IconSizeType;
  color: string;
}

const CloseIcon = ({ size = "small", color }: IconProps) => (
  <Icon name={"close"} size={IconSizeValue[size]} color={color} />
);

export default CloseIcon;
