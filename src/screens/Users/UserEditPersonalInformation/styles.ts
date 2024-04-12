import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "@theme/colors";

const Container = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    padding: 16
  }
})``;

const Footer = styled.View`
  padding: 16px;
  background-color: ${colors.Greyscale.b100};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Divider = styled.Text`
  height: 16px;
`;

export default {
  Container,
  Footer,
  Divider,
};
