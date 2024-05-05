import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Answers } from 'components/common/Answers/Answers'

describe('Answers component', () => {
  const mockPhrase = {
    en: 'Test English Phrase',
    fa: ['Test Farsi Phrase 1', 'Test Farsi Phrase 2'],
    hint: 'Test Hint'
  }

  test('renders component with given phrase and collapse keys', () => {
    const activeCollapseKeys = ['1']
    const setActiveCollapseKeys = jest.fn()

    const { getByText } = render(
      <Answers
        phrase={mockPhrase}
        activeCollapseKeys={activeCollapseKeys}
        setActiveCollapseKeys={setActiveCollapseKeys}
      />
    )

    expect(getByText('Show Hint 🙊')).toBeInTheDocument()
    expect(getByText('Show Answer 🙉')).toBeInTheDocument()
    expect(getByText('Test Farsi Phrase 1 🙈')).toBeInTheDocument()
    expect(getByText('Test Farsi Phrase 2 🙈')).toBeInTheDocument()
  })

  test('collapse panels toggle correctly', async () => {
    const { getByText, container } = render(
      <Answers
        phrase={mockPhrase}
        activeCollapseKeys={['1']}
        setActiveCollapseKeys={jest.fn()}
      />
    )

    fireEvent.click(getByText('Show Answer 🙉'))

    await waitFor(() => {
      expect(
        container.querySelector('.ant-collapse-content-active')
      ).toBeInTheDocument()
    })
  })
})
