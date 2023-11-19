import { render, fireEvent } from '@testing-library/react-native';
import Label from '.'
import colors from '../../../theme/colors';

describe('Label', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly with default values', async () => {
    const onPressMock = jest.fn()

    const { getByText } = render(
      <Label
        onPress={onPressMock}
      >
        label sample
      </Label>
    )

    const label = getByText('label sample')
    fireEvent.press(label)

    expect(onPressMock).toHaveBeenCalled()
  })

  it('should render correctly with non-default values', async () => {
    const onPressMock = jest.fn()

    const { getByText } = render(
      <Label
        onPress={onPressMock}
        size={'medium'}
        color={colors.red}
        bold
      >
        label sample
      </Label>
    )

    const label = getByText('label sample')
    fireEvent.press(label)

    expect(onPressMock).toHaveBeenCalled()
  })
})
