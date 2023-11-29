import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ImageLogo = styled.Image.attrs({
  source: require("@assets/icon.png"),
})`
  width: 200px;
  height: 200px;
`;

export default {
  Container,
  ImageLogo,
};
