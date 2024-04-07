import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // for expect(...).toBeInTheDocument()
import { MemoryRouter } from 'react-router-dom'
import { Nav } from './Nav'

jest.mock('../../../hooks/useModules', () => ({
  useModules: () => ({
    modules: [
      { title: 'Module 1', emoji: '😊' },
      { title: 'Module 2', emoji: '🚀' }
    ]
  })
}))

test('renders Nav component with modules', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  )

  const collapseButton = getByTestId('collapseButton')
  expect(collapseButton).toBeInTheDocument()

  const module1Link = getByText('Module 1')
  const module2Link = getByText('Module 2')
  expect(module1Link).toBeInTheDocument()
  expect(module2Link).toBeInTheDocument()
})

test('clicking on collapse button toggles sidebar', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  )

  const sidebar = getByTestId('sidebar')
  expect(sidebar).toHaveClass('ant-layout-sider-collapsed')

  const collapseButton = getByTestId('collapseButton')

  fireEvent.click(collapseButton)

  expect(sidebar).not.toHaveClass('ant-layout-sider-collapsed')
})
