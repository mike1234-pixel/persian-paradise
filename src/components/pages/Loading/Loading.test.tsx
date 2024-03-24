import { render } from '@testing-library/react'
import { Loading } from './Loading'

describe('<Loading />', () => {
  it('renders the correct number of bubbles', () => {
    const { container } = render(<Loading />)
    const bubbles = container.querySelectorAll('.bubbleContainer')
    expect(bubbles.length).toBe(10)
  })

  it('renders the loading text', () => {
    const { getByText } = render(<Loading />)
    expect(getByText('loading...')).toBeInTheDocument()
  })

  it('renders a Typography.Title component', () => {
    const { container } = render(<Loading />)
    const title = container.querySelector('.ant-typography')
    expect(title).toBeInTheDocument()
  })
})
