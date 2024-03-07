import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled(KeyboardAwareScrollView)`
  padding: 16px;
`;

const Footer = styled.View`
  padding: 16px;
`;

const Divider = styled.Text`
  height: 16px;
`;

export default {
  Container,
  Footer,
  Divider,
};
