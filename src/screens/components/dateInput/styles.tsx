import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";

interface CustomTextDateProps {
  isFocused: boolean;
}

const TextDate = styled.Text`
  line-height: 50px;
  font-size: 16px;
  font-family: ${fonts.regular};
  color: ${colors.black};
`;

const TextDatePlaceholder = styled.Text`
  font-size: 16px;
  line-height: 50px;
  font-family: ${fonts.regular};
  color: ${colors.Greyscale.b60};
`;

const Container = styled.TouchableOpacity<CustomTextDateProps>`
  margin-top: 4px;
  position: relative;
  background-color: ${colors.Greyscale.b100};
  border-width: 1px;
  border-radius: 4px;
  border-color: ${({ isFocused }: CustomTextDateProps) => (isFocused ? colors.Greyscale.b50 : colors.Greyscale.b80)};
  height: 50px;
  padding: 0px 12px;
`

export default {
  TextDate,
  TextDatePlaceholder,
  Container,
};
