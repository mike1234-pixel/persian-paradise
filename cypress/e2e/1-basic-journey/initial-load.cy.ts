import phrases from '../../fixtures/1-phrases.json'
import food from '../../fixtures/2-food.json'

/// <reference types="cypress" />

describe('initial load', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept(
      {
        method: 'GET',
        url: '/api/modules'
      },
      [phrases, food]
    ).as('modules')
  })

  it('displays button once loaded', () => {
    cy.wait('@modules')
    cy.contains('loading...').should('not.exist')
    cy.contains('Start Learning').should('be.visible')
  })
})
