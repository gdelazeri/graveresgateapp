import Label from "@screens/components/label";
import Styled from "./styles";
import colors from "@theme/colors";

interface RequestsIndicatorProps {
  count: number;
}

const RequestsIndicator = ({ count }: RequestsIndicatorProps) => {
  return (
    <Styled.Container>
      <Label size="small" color={colors.Greyscale.b50}>
        {count > 0 ? count : "Nenhuma"} solicitaç{count > 1 ? "ões" : "ão"}
      </Label>
    </Styled.Container>
  );
};

export default RequestsIndicator;
