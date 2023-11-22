import styled from "styled-components/native";
import colors from "../../../theme/colors";
import fonts from "../../../theme/fonts";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-between;
`;

const Form = styled.View``;

const ImageLogo = styled.Image.attrs({
  source: require("../../../../assets/icon.png"),
})`
  width: 200px;
  height: 200px;
`;

const Title = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.black};
`;

const Divider = styled.Text`
  height: 10px;
`;

export default {
  Container,
  Form,
  ImageLogo,
  Title,
  Divider,
};
