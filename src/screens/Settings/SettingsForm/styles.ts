import styled from "styled-components/native"
import colors from "@theme/colors"

const Footer = styled.View`
  padding: 16px;
  background-color: ${colors.Greyscale.b100};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Divider = styled.View`
  height: 16px;
`;

const DividerLine = styled.View`
  height: 1px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.Greyscale.b80};
`;

const InlineContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.Greyscale.b100};
`;

const InputValue = styled.View`
  width: 85%;
`

const IconButton = styled.TouchableOpacity`
  padding: 8px;
`

export default {
  Footer,
  Divider,
  DividerLine,
  InlineContainer,
  InputValue,
  IconButton
}