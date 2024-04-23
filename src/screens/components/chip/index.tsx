import Label from "../label";
import Styled from "./styles";

interface ChipProps {
  label?: string;
  labelColor?: string;
  backgroundColor?: string;
  testID?: string;
}

const Chip = ({ label, labelColor, backgroundColor, testID }: ChipProps) => {
  return (
    <Styled.Container testID={testID}>
      <Styled.ChipContainer backgroundColor={backgroundColor}>
        <Label size="small" color={labelColor}>
          {label}
        </Label>
      </Styled.ChipContainer>
    </Styled.Container>
  );
};

export default Chip;
