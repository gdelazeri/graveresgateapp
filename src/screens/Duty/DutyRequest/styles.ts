import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled(KeyboardAwareScrollView)`
  padding: 16px;
`;

const Footer = styled.View`
  padding: 16px;
`

const Title = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.black};
`;

const Divider = styled.Text`
  height: 16px;
`;

export default {
  Container,
  Footer,
  Title,
  Divider,
};
