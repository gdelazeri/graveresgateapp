import colors from "@theme/colors";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const Divider = styled.View`
  height: 1px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.Greyscale.b90};
`;

export default {
  Container,
  Divider,
};
