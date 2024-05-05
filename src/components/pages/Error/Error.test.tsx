import { render } from '@testing-library/react'
import { Error } from 'components/pages/Error/Error'

describe('<Error />', () => {
  test('renders error message correctly', () => {
    const errorMessage = 'This is an error message'
    const error: Error = {
      message: errorMessage,
      name: 'TestError'
    }

    const { getByText } = render(<Error error={error} />)

    expect(getByText('Error')).toBeInTheDocument()
    expect(getByText(errorMessage)).toBeInTheDocument()
  })
})
