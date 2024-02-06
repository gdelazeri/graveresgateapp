import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { Icon } from "react-native-elements";

const Header = styled.View`
  padding: 16px;
  padding-top: 8px;
  background-color: ${colors.Greyscale.b98};
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: 22px;
  color: ${colors.Greyscale.b50};
  margin-left: 8px;
`;

const UserIcon = styled(Icon).attrs({
  name: "account-circle",
  size: 48,
  color: colors.Greyscale.b50,
  containerStyle: {
    padding: 0,
    margin: 0
  }
})``;

const AvatarContainer = styled.View`
  border-width: 2px;
  border-color: ${colors.red};
  border-radius: 24px;
  width: 48px;
  height: 48px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export default {
  Header,
  Title,
  UserIcon,
  AvatarContainer,
};
