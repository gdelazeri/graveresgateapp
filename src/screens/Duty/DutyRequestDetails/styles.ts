import colors from "@theme/colors";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  padding: 16px;
`;

const Divider = styled.Text`
  height: 16px;
`;

const Footer = styled.View`
  padding: 16px;
  background-color: ${colors.Greyscale.b100};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`

export default {
  Container,
  Divider,
  Footer,
};
