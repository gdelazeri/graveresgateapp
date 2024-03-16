import styled from "styled-components/native";

interface TextStyledProps {
  fontFamily: string;
  color: string;
  fontSize: number;
  noMarginBottom: boolean;
}

const Text = styled.Text<TextStyledProps>`
  font-family: ${({ fontFamily }: TextStyledProps) => fontFamily};
  font-size: ${({ fontSize }: TextStyledProps) => fontSize}px;
  color: ${({ color }: TextStyledProps) => color};
  margin-bottom: ${({ noMarginBottom }: TextStyledProps) => noMarginBottom ? 0 : 2}px;
`;

export default {
  Text,
};
