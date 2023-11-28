import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";

const ErrorText = styled.Text`
  color: ${colors.red};
  font-family: ${fonts.regular};
  font-size: 14px;
  margin-top: 4px;
`;

export default {
  ErrorText,
};
