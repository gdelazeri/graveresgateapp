import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const ContainerAvatar = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Divider = styled.View`
  height: 8px;
`;

export default {
  Container,
  ScrollView,
  ContainerAvatar,
  Divider,
};
