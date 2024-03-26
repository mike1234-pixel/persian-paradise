import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import reportWebVitals from './reportWebVitals'

jest.mock('./reportWebVitals', () => jest.fn().mockResolvedValue(undefined))

test('renders App component in StrictMode', () => {
  const rootElement = document.createElement('div')
  rootElement.id = 'root'
  document.body.appendChild(rootElement)

  const { getByText } = render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  expect(getByText('Guide')).toBeInTheDocument()
  expect(getByText('Glossary')).toBeInTheDocument()

  setTimeout(() => {
    expect(reportWebVitals).toHaveBeenCalled()

    document.body.removeChild(rootElement) // cleanup
  }, 100)
})
