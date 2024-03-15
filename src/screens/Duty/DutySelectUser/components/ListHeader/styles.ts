import colors from "@theme/colors";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: ${colors.Greyscale.b90};
  padding: 8px 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.Greyscale.b80};
`;

const EmptyContainer = styled.View`
  background-color: ${colors.Greyscale.b100};
  padding: 12px;
`;

export default {
  Container,
  EmptyContainer
};
