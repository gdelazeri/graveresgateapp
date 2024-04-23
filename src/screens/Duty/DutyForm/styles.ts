import styled from "styled-components/native";
import colors from "@theme/colors";

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Footer = styled.View`
  padding: 16px;
  background-color: ${colors.Greyscale.b100};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Divider = styled.View`
  height: 16px;
`;

export default {
  ScrollView,
  Footer,
  Divider,
};
