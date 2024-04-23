import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Divider = styled.View`
  height: 16px;
`;

const InlineInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InlineInput = styled.View`
  width: 50%;
`;

export default {
  Container,
  ScrollView,
  Divider,
  InlineInputContainer,
  InlineInput,
};
