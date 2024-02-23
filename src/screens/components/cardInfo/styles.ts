import styled from "styled-components/native";
import colors from "@theme/colors";

const Container = styled.View`
  padding: 12px;
  border-radius: 8px;
  background-color: ${colors.Greyscale.b100};
  border-width: 1px;
  border-color: ${colors.Greyscale.b90};
`;

const LabelContainer = styled.View`
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
`;

export default {
  Container,
  LabelContainer
};
