import styled from "styled-components/native";
import colors from "@theme/colors";
import { TouchableOpacityProps } from "react-native";

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

const Item = styled.TouchableOpacity<TouchableOpacityProps>``;

const DividerLine = styled.View`
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
  border-bottom-color: ${colors.Greyscale.b80};
  border-bottom-width: 1px;
`;

export default {
  ScrollView,
  Footer,
  Divider,
  Item,
  DividerLine,
};
