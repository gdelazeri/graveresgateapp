import colors from "@theme/colors";
import fonts from "@theme/fonts";
import styled from "styled-components/native";

const Container = styled.View`
  margin-top: 4px;
  position: relative;
`;

const ErrorText = styled.Text`
  color: ${colors.red};
  font-family: ${fonts.regular};
  font-size: 14px;
  margin-top: 4px;
`;

export default {
  Container,
  ErrorText,
};
