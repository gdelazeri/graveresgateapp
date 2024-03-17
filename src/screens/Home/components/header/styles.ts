import { Icon } from "react-native-elements";
import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";

const Header = styled.View`
  padding: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${colors.Greyscale.b100};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: 22px;
  color: ${colors.Greyscale.b50};
  margin-left: 8px;
`;

const SignOutIcon = styled(Icon).attrs({
  name: "logout",
  size: 24,
  color: colors.Greyscale.b50,
  containerStyle: {
    padding: 8,
    margin: 0,
  }
})``;

export default {
  Header,
  TitleContainer,
  Title,
  SignOutIcon
};
