/// <reference types="cypress" />

describe('initial load', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('initially displays a loading screen', () => {
    cy.contains('loading').should('exist')
    cy.contains('loading').should('not.exist')
    cy.contains('Start Learning').should('be.visible')
  })
})
