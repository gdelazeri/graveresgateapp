import colors from "@theme/colors";
import styled from "styled-components/native";

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Divider = styled.View`
  height: 8px;
`;

const Footer = styled.View`
  padding: 16px;
  background-color: ${colors.Greyscale.b100};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const StatusContainer = styled.View`
  margin-top: 4px;
`;

export default {
  ScrollView,
  Divider,
  Footer,
  StatusContainer,
};
