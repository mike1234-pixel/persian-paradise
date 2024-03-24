import { render } from '@testing-library/react'
import { NotFound404 } from './NotFound404'

describe('<NotFound404 />', () => {
  it('renders the 404 title correctly', () => {
    const { getByText } = render(<NotFound404 />)
    expect(getByText('404')).toBeInTheDocument()
  })
})
