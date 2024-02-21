import Styled from './styles';

interface ChipProps {
  label?: string;
  labelColor?: string;
  backgroundColor?: string;
}

const Chip = ({ label, labelColor, backgroundColor }: ChipProps) => {
  return (
    <Styled.Container>
      <Styled.ChipContainer backgroundColor={backgroundColor}>
        <Styled.Label color={labelColor}>{label}</Styled.Label>
      </Styled.ChipContainer>
    </Styled.Container>
  );
}

export default Chip;
