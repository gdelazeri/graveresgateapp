import styled from "styled-components/native";

interface TextStyledProps {
  fontFamily: string;
  color: string;
  fontSize: number;
  noMarginBottom: boolean;
  underline: boolean;
}

const Text = styled.Text<TextStyledProps>`
  font-family: ${({ fontFamily }: TextStyledProps) => fontFamily};
  font-size: ${({ fontSize }: TextStyledProps) => fontSize}px;
  color: ${({ color }: TextStyledProps) => color};
  margin-bottom: ${({ noMarginBottom }: TextStyledProps) =>
    noMarginBottom ? 0 : 2}px;
  text-decoration: none;
  text-decoration: ${({ underline }: TextStyledProps) =>
    underline ? 'underline' : 'none'};
`;

export default {
  Text,
};
