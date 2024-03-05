import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";

const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const Form = styled.View`
  margin-bottom: 16px;
`;

const Title = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.black};
`;

const Divider = styled.Text`
  height: 16px;
`;

export default {
  Container,
  Form,
  Title,
  Divider,
};
