import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { LabelSizeValue } from "@screens/components/label/types";

const Container = styled.TouchableOpacity`
  background-color: ${colors.Greyscale.b100};
  border-color: ${colors.Greyscale.b80};
  margin-top: 4px;
  position: relative;
  border-radius: 4px;
  border-width: 1px;
  padding: 0px 8px;
  height: 40px;
  justify-content: center;
`

const UserData = styled.View`
  flex-direction: row;
  align-items: center;
`

const UserAvatar = styled.View`
  margin-right: 8px;
`

const Label = styled.Text`
  font-family: ${fonts.regular};
  font-size: ${LabelSizeValue.medium}px;
  color: ${colors.black};
`

export default {
  Container,
  UserData,
  UserAvatar,
  Label
};
