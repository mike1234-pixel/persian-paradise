import phrases from '../../fixtures/1-phrases.json'
import colours from '../../fixtures/mini-module-colours.json'

/// <reference types="cypress" />

describe('Glossary Accordion', () => {
  // Setup
  beforeEach(() => {
    cy.visit('/glossary')
    cy.intercept(
      {
        method: 'GET',
        url: '/api/modules'
      },
      [phrases, colours]
    ).as('modules')
  })

  it('displays a glossary in an accordion with functioning pagination and collapsing', () => {
    // Wait for modules to load
    cy.wait('@modules')

    // Check if glossary accordion exists
    cy.get('.ant-collapse').should('exist')

    // Expand "Phrases 1" section and verify content
    cy.contains('.ant-collapse-header-text', 'Phrases 1').click()
    cy.contains('hello').should('be.visible')

    // Navigate to page 2 and verify content
    cy.contains('2').click()
    cy.contains('no news').should('be.visible')

    // Collapse "Colours" section and verify content is hidden
    cy.contains('.ant-collapse-header-text', 'Colours').click()
    cy.contains('no news').should('not.be.visible')
  })
})
