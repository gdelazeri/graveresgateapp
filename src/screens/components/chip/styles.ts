import styled from "styled-components/native";
import colors from "@theme/colors";
import { LabelSizeValue } from "../label/types";
import fonts from "@theme/fonts";

interface ChipProps {
  backgroundColor?: string;
  color?: string;
}

const Container = styled.View`
  flex-direction: row;
`;

const ChipContainer = styled.View<ChipProps>`
  padding: 2px 8px;
  border-radius: 16px;
  background-color: ${({ backgroundColor }: ChipProps) =>
    backgroundColor || colors.Greyscale.b100};
`;

export default {
  Container,
  ChipContainer,
};
