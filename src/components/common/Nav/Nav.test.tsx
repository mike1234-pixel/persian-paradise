import { render, fireEvent, act } from '@testing-library/react'
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

test('renders Nav component with modules', async () => {
  const { getByTestId, getByText } = await act(async () =>
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )
  )
  const collapseButton = getByTestId('collapseButton')
  expect(collapseButton).toBeInTheDocument()

  const module1Link = getByText('Module 1')
  const module2Link = getByText('Module 2')
  expect(module1Link).toBeInTheDocument()
  expect(module2Link).toBeInTheDocument()
})

test('clicking on collapse button toggles sidebar', async () => {
  const { getByTestId } = await act(async () =>
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )
  )

  const sidebar = getByTestId('sidebar')
  expect(sidebar).toHaveClass('ant-layout-sider-collapsed')

  const collapseButton = getByTestId('collapseButton')

  fireEvent.click(collapseButton)

  expect(sidebar).not.toHaveClass('ant-layout-sider-collapsed')
})

// to get rid of this warning wrap render in act() like above

// console.error
// Warning: An update to ForwardRef inside a test was not wrapped in act(...).

// When testing, code that causes React state updates should be wrapped into act(...):

// act(() => {
//   /* fire events that update state */
// });
// /* assert on the output */

// This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
