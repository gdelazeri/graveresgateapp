import styled from "styled-components/native";

interface TextStyledProps {
  fontFamily: string;
  color: string;
  fontSize: number;
}

const Text = styled.Text<TextStyledProps>`
  font-family: ${({ fontFamily }: TextStyledProps) => fontFamily};
  font-size: ${({ fontSize }: TextStyledProps) => fontSize}px;
  color: ${({ color }: TextStyledProps) => color};
  margin-bottom: 2px;
`;

export default {
  Text,
};
