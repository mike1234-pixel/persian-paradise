import { render } from '@testing-library/react'
import { Loading } from './Loading'

describe('<Loading />', () => {
  it('renders the loading text', () => {
    const { getByText } = render(<Loading />)
    expect(getByText('loading...')).toBeInTheDocument()
  })
})
