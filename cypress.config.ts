import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts'
  },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL ?? 'http://localhost:4000',
    REACT_APP_BASE_URL:
      process.env.REACT_APP_BASE_URL ?? 'http://localhost:3000'
  }
})
