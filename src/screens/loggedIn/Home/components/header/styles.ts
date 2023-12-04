import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { Avatar, Icon } from "react-native-elements";

const Header = styled.View`
  padding: 16px;
  padding-top: 8px;
  background-color: ${colors.Greyscale.b100};
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
})``;

export default {
  Header,
  Title,
  UserIcon,
};
