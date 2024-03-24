import { render } from '@testing-library/react'
import { Guide } from './Guide'
import { BrowserRouter } from 'react-router-dom'

describe('<Guide />', () => {
  it('renders the title "User Guide"', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Guide />
      </BrowserRouter>
    )
    expect(getByText('User Guide 👨‍💻')).toBeInTheDocument()
  })

  it('renders the "Course Modules" section', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Guide />
      </BrowserRouter>
    )
    expect(getByText('Course Modules 📘')).toBeInTheDocument()
  })
})
