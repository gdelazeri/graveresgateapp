import styled from "styled-components/native";

interface AvatarStyleProps {
  size: number;
}

const AvatarContainer = styled.View<AvatarStyleProps>`
  border-radius: 24px;
  width: ${({ size }: AvatarStyleProps) => size}px;
  height: ${({ size }: AvatarStyleProps) => size}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export default {
  AvatarContainer,
};
