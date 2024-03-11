import Label from "../label";
import Styled from "./styles";

const EmptyList = ({ text }: { text: string }) => (
  <Styled.Container>
    <Label size="small">{text}</Label>
  </Styled.Container>
)

export default EmptyList;