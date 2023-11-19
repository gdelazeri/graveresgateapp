import { render, fireEvent } from '@testing-library/react-native';
import Label from '.'
import colors from '../../../theme/colors';

describe('Label', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', async () => {
    const onPressMock = jest.fn()

    const { getByText } = render(
      <Label
        onPress={onPressMock}
        size={'medium'}
        color={colors.black}
        bold={false}
      >
        label sample
      </Label>
    )

    const label = getByText('label sample')
    fireEvent.press(label)

    expect(onPressMock).toHaveBeenCalled()
  })
})
