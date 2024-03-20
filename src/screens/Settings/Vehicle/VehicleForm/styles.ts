import styled from "styled-components/native"
import colors from "@theme/colors"

const Container = styled.ScrollView`
  padding: 16px;
`;

const Footer = styled.View`
  padding: 16px;
  background-color: ${colors.Greyscale.b100};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Divider = styled.Text`
  height: 16px;
`;

const ContainerSwitch = styled.View`
  margin-top: 4px;
`

export default {
  Container,
  Footer,
  Divider,
  ContainerSwitch
}