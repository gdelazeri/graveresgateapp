import { render, waitFor } from '@testing-library/react-native';
import App from './App'

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('App tests', () => {
    it('should render correctly', async () => {
      const navigationMock = {
        navigate: jest.fn()
      } as any

      const { queryByTestId } = render(
        <App />
      )

      await waitFor(() => {
        expect(queryByTestId('safe-area-view')).toBeTruthy()
      })
    })
  })
})
