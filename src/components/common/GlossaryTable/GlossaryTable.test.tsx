import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // For expect(...).toBeInTheDocument()
import { GlossaryTable } from './GlossaryTable'

describe('<GlossaryTable />', () => {
  it('renders table with correct data', () => {
    const mockPhrases = [
      {
        key: 1,
        en: 'Hello',
        fa: {
          informal: 'سلام',
          formal: 'درود'
        },
        emoji: '👋'
      },
      {
        key: 2,
        en: 'Goodbye',
        fa: ['خداحافظ', 'خدا نگهدار'],
        emoji: '👋🏼'
      }
    ]

    const { getByText } = render(<GlossaryTable phrases={mockPhrases} />)

    // Check if English column is rendered
    expect(getByText('English')).toBeInTheDocument()

    // Check if Persian column is rendered
    expect(getByText('Persian')).toBeInTheDocument()

    // Check if data is rendered correctly
    expect(getByText('Hello')).toBeInTheDocument()
    expect(getByText('سلام')).toBeInTheDocument()
    expect(getByText('درود')).toBeInTheDocument()
    expect(getByText('👋')).toBeInTheDocument()

    expect(getByText('Goodbye')).toBeInTheDocument()
    expect(getByText('خداحافظ, خدا نگهدار')).toBeInTheDocument()
    expect(getByText('👋🏼')).toBeInTheDocument()
  })
})
