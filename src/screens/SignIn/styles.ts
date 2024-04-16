import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-between;
`;

const Form = styled.View``;

const Title = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.black};
`;

const Divider = styled.View`
  height: 16px;
`;

const ErrorMessage = styled.Text`
  font-family: ${fonts.bold};
  font-size: 14px;
  color: ${colors.red};
  text-align: center;
  margin-top: 30px;
`;

export default {
  Container,
  Form,
  Title,
  Divider,
  ErrorMessage
};
