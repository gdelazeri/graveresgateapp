import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
`

const Title = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.black};
`;

const Divider = styled.Text`
  height: 16px;
`;

const Inline = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const TimeInputContainer = styled.View`
  width: 50%;
`

export default {
  Container,
  Footer,
  Title,
  Divider,
  Inline,
  TimeInputContainer
};
