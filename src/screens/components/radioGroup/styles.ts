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
  margin-top: 8px;
  /* border-width: 1px; */
  border-color: ${colors.Greyscale.b80};
  border-radius: 4px;
`

const ItemLabel = styled.View`
  margin-top: 2px;
  margin-left: 4px;
  flex-direction: row;
`

const InputOther = styled.TextInput`
  font-size: 16px;
  font-family: ${fonts.regular};
  color: ${colors.black};
  margin-left: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.Greyscale.b80};
  width: 75%;
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
  InputOther
};
