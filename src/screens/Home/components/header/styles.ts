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

export default {
  Header,
  Title,
};
