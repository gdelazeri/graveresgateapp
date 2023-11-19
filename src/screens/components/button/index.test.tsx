import { render, fireEvent } from '@testing-library/react-native';
import Button from '.'

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', async () => {
    const onPressMock = jest.fn()

    const { getByText } = render(
      <Button
        title='Button Text'
        onPress={onPressMock}
      />
    )

    const buttonText = getByText('Button Text')
    fireEvent.press(buttonText)

    expect(onPressMock).toHaveBeenCalled()
  })
})
