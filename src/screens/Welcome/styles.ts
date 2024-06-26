import colors from "@theme/colors";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.Greyscale.b98};
`;

const ImageLogo = styled.Image.attrs({
  source: require("@assets/icon.png"),
})`
  width: 200px;
  height: 200px;
`;

const Buttons = styled.View`
  margin-top: 80px;
  width: 80%;
`;

const Divider = styled.View`
  height: 10px;
`;

export default {
  Container,
  ImageLogo,
  Buttons,
  Divider,
};
