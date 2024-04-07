import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Router } from './App'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('Router', () => {
  test('renders without crashing', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Router />
        </MemoryRouter>
      </QueryClientProvider>
    )
  })
})
