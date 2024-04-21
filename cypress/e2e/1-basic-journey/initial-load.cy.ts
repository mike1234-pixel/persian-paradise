import phrases from '../../fixtures/1-phrases.json'
import food from '../../fixtures/2-food.json'

/// <reference types="cypress" />

describe('initial load', () => {
  const baseUrl =
    Cypress.env('REACT_APP_BASE_URL') ??
    'https://main.d2maooaw9hc7ck.amplifyapp.com/'
  beforeEach(() => {
    cy.visit(baseUrl as string)

    cy.intercept(
      {
        method: 'GET',
        url: '/api/modules'
      },
      [phrases, food]
    ).as('modules')
  })

  it('initially displays a loading screen', () => {
    cy.wait('@modules')
    cy.contains('loading...').should('exist')
    cy.contains('loading...').should('not.exist')
    cy.contains('Start Learning').should('be.visible')
  })
})
