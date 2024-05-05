import { render, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TopNav } from 'components/common/TopNav'

const mockUseLocation = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocation()
}))

describe('TopNav', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      pathname: '/guide'
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders menu items correctly', async () => {
    const { getByText } = await act(async () =>
      render(
        <MemoryRouter initialEntries={['/guide']}>
          <TopNav />
        </MemoryRouter>
      )
    )

    expect(getByText('Guide')).toBeInTheDocument()
    expect(getByText('Glossary')).toBeInTheDocument()
  })

  it('updates current state on menu item click', async () => {
    const { getByText } = await act(async () =>
      render(
        <MemoryRouter initialEntries={['/guide']}>
          <TopNav />
        </MemoryRouter>
      )
    )

    const glossaryLink = getByText('Glossary')

    fireEvent.click(glossaryLink)

    expect(glossaryLink.parentElement?.parentElement).toHaveClass(
      'ant-menu-item-selected'
    )
  })
})
