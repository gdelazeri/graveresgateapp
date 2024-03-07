import colors from "@theme/colors";
import fonts from "@theme/fonts";
import styled from "styled-components/native";

const Container = styled.View`
  margin-top: 4px;
  position: relative;
`

const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`

const ItemLabel = styled.View`
  margin-top: 2px;
  margin-left: 4px;
`

const ErrorText = styled.Text`
  color: ${colors.red};
  font-family: ${fonts.regular};
  font-size: 14px;
  margin-top: 4px;
`;

export default {
  Container,
  Item,
  ErrorText,
  ItemLabel
};
