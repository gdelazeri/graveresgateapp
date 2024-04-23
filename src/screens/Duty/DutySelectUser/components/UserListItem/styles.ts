import colors from "@theme/colors";
import styled from "styled-components/native";

interface UserItemProps {
  disabled: boolean;
}

const Touchable = styled.TouchableOpacity<UserItemProps>`
  background-color: ${colors.Greyscale.b100};
  padding: 12px;
  flex-direction: row;
  align-items: center;
  opacity: ${({ disabled }: UserItemProps) => (disabled ? 0.5 : 1)};
`;

const UserInfo = styled.View`
  margin-left: 12px;
  width: 85%;
`;

const InlineTime = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 2px;
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
  InlineTime,
  Inline,
  ChipContainer,
};
