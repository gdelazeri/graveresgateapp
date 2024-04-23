import styled from "styled-components/native";
import colors from "@theme/colors";

interface ContainerProps {
  borderColor: string;
}

const Container = styled.View<ContainerProps>`
  padding: 12px;
  border-radius: 8px;
  background-color: ${colors.Greyscale.b100};
  border-width: 1px;
  border-color: ${({ borderColor }: ContainerProps) =>
    borderColor || colors.Greyscale.b90};
`;

const LabelContainer = styled.View`
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
`;

export default {
  Container,
  LabelContainer,
};
