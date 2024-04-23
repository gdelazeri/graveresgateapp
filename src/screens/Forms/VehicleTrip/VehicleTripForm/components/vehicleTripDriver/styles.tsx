import styled from "styled-components/native";
import colors from "@theme/colors";

const Container = styled.TouchableOpacity`
  background-color: ${colors.Greyscale.b100};
  border-color: ${colors.Greyscale.b80};
  margin-top: 4px;
  position: relative;
  border-radius: 4px;
  border-width: 1px;
  padding: 0px 0px 0px 8px;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const UserData = styled.View`
  flex-direction: row;
  align-items: center;
  width: 85%;
  padding-right: 20px;
`;

const UserAvatar = styled.View`
  margin-right: 8px;
`;

const IconContainer = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`;

export default {
  Container,
  UserData,
  UserAvatar,
  LabelContainer,
  IconContainer,
};
