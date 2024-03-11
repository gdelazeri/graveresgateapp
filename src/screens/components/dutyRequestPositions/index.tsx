import { DutyPosition, DutyPositionLabel } from '@api/dutyRequest/types';
import Styled from './styles';
import Chip from '../chip';
import colors from '@theme/colors';

interface DutyRequestPositionsProps {
  id: string
  positions: DutyPosition[];
}

const DutyRequestPositions = ({ id, positions }: DutyRequestPositionsProps) => (
  <Styled.Container>
    {positions.map((position, index) => (
      <Styled.Item key={`${id}_position_${index}`}>
        <Chip
          testID={`${id}_position_${index}`}
          label={DutyPositionLabel[position]}
          labelColor={colors.Greyscale.b100}
          backgroundColor={colors.red}
        />
      </Styled.Item>
    ))}
  </Styled.Container>
)

export default DutyRequestPositions;
