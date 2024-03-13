import colors from "@theme/colors";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  padding: 16px;
`;

const Divider = styled.Text`
  height: 8px;
`;

const Footer = styled.View`
  padding: 16px;
  background-color: ${colors.Greyscale.b100};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`

const StatusContainer = styled.View`
  margin-top: 4px;
`

export default {
  Container,
  Divider,
  Footer,
  StatusContainer,
};
