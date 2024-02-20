import styled from "styled-components/native";
import colors from "@theme/colors";
import { Icon } from "react-native-elements";

interface AvatarStyleProps {
  size: number
}

const UserIcon = styled(Icon).attrs({
  name: "account-circle",
  color: colors.Greyscale.b50,
  containerStyle: {
    padding: 0,
    margin: 0
  }
})<AvatarStyleProps>``;

const AvatarContainer = styled.View<AvatarStyleProps>`
  border-radius: 24px;
  width: ${({ size }: AvatarStyleProps) => size}px;
  height: ${({ size }: AvatarStyleProps) => size}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export default {
  UserIcon,
  AvatarContainer,
};
