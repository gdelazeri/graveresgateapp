import colors from "@theme/colors";
import styled from "styled-components/native";

const Touchable = styled.TouchableOpacity`
  background-color: ${colors.Greyscale.b100};
  padding: 12px;
  flex-direction: row;
  align-items: center;
`;

const UserInfo = styled.View`
  margin-left: 12px;
`;

const Inline = styled.View`
  flex-direction: row;
`;

const ChipContainer = styled.View`
  margin-right: 8px;
`;

export default {
  Touchable,
  UserInfo,
  Inline,
  ChipContainer
};
