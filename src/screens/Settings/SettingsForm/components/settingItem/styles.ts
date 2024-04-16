import colors from "@theme/colors";
import styled from "styled-components/native";

const Touchable = styled.TouchableOpacity`
  background-color: ${colors.Greyscale.b100};
  padding: 8px 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconButton = styled.TouchableOpacity`
  padding: 8px;
`;

export default {
  Touchable,
  IconButton,
}