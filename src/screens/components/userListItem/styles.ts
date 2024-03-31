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

export default {
  Touchable,
  UserInfo,
};
