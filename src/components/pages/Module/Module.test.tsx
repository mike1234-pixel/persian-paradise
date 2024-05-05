import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Module } from 'components/pages/Module'
import { ConfettiAnimationContextProvider } from 'context/ConfettiAnimationContext'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({})
}))

const mockModule = {
  title: 'Mock Module',
  subtitle: 'Mock Subtitle',
  phrases: [
    {
      en: 'English Phrase',
      emoji: '😊',
      fa: {
        formal: 'Formal Persian Translation',
        informal: 'Informal Persian Translation'
      }
    }
  ]
}

describe('<Module />', () => {
  test('renders module title and subtitle', () => {
    const { getByText } = render(
      <ConfettiAnimationContextProvider>
        <Module
          module={mockModule}
          moduleLoading={false}
          errorLoadingModule={null}
        />
      </ConfettiAnimationContextProvider>
    )

    expect(getByText('Mock Module')).toBeInTheDocument()
    expect(getByText('Mock Subtitle')).toBeInTheDocument()
  })

  test('handles input change and checks answer', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ConfettiAnimationContextProvider>
        <Module
          module={mockModule}
          moduleLoading={false}
          errorLoadingModule={null}
        />
      </ConfettiAnimationContextProvider>
    )

    const input = getByPlaceholderText('Answer in Persian')
    fireEvent.change(input, { target: { value: 'Formal Persian Translation' } })

    await waitFor(() => {
      expect(getByText('Next Phrase 👉')).toBeInTheDocument()
    })
  })

  test('handles module complete', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ConfettiAnimationContextProvider>
        <Module
          module={mockModule}
          moduleLoading={false}
          errorLoadingModule={null}
        />
      </ConfettiAnimationContextProvider>
    )

    const input = getByPlaceholderText('Answer in Persian')
    fireEvent.change(input, { target: { value: 'Formal Persian Translation' } })

    await waitFor(() => {
      const nextButton = getByText('Next Phrase 👉')
      fireEvent.click(nextButton)
    })

    expect(getByText('Module Complete')).toBeInTheDocument()
  })
})
