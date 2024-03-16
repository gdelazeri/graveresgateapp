import colors from "@theme/colors";
import { Icon } from "react-native-elements";
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
  align-items: center;
  margin-top: 2px;
`;

const TimeIcon = styled(Icon).attrs({
  name: "access-time",
  size: 16,
  color: colors.Greyscale.b50,
  containerStyle: {
    padding: 0,
    margin: 0
  }
})`
  margin-right: 4px;
`;

export default {
  Touchable,
  UserInfo,
  Inline,
  TimeIcon
};
