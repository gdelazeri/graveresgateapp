import colors from "@theme/colors";
import fonts from "@theme/fonts";
import styled from "styled-components/native";

const Container = styled.View`
  position: relative;
`

const Item = styled.View`
  margin-top: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ItemLabel = styled.View`
  width: 60%;
  padding-right: 8px;
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
  ItemLabel,
};
