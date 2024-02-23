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
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }: ChipProps) => backgroundColor || colors.Greyscale.b100};
`;

const Label = styled.Text`
  color: ${({ color }: ChipProps) => color || colors.black};
  font-size: ${LabelSizeValue.small}px;
  font-family: ${fonts.regular};
`

export default {
  Container,
  ChipContainer,
  Label
};
