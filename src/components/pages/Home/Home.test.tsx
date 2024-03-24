import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './Home'

describe('<Home />', () => {
  it('renders the title and subtext correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    expect(getByText('Persian Paradise')).toBeInTheDocument()
    expect(
      getByText('A simple entry point into learning Farsi for English speakers')
    ).toBeInTheDocument()
  })

  it('renders a button linking to the guide', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    const button = getByText('Start Learning')
    expect(button).toBeInTheDocument()

    expect(button.closest('a')).toHaveAttribute('href', '/guide')
  })

  it('redirects to the guide page when the button is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    const button = getByText('Start Learning')

    fireEvent.click(button)

    expect(window.location.pathname).toBe('/guide')
  })
})
