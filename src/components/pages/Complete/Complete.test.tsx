import { render } from '@testing-library/react'
import { Complete } from './Complete'

describe('Complete Component', () => {
  test('renders with correct content and styles', () => {
    const { getByText } = render(<Complete />)

    const titleElement = getByText('Module Complete')
    expect(titleElement).toBeInTheDocument()

    const emojiElement = getByText('🥳')
    expect(emojiElement).toBeInTheDocument()
  })
})
