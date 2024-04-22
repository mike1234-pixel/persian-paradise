import phrases from '../../fixtures/1-phrases.json'
import colours from '../../fixtures/mini-module-colours.json'

/// <reference types="cypress" />

describe('User Guide', () => {
  // Setup
  beforeEach(() => {
    cy.visit('/guide')
    cy.intercept(
      {
        method: 'GET',
        url: '/api/modules'
      },
      [phrases, colours]
    ).as('modules')
  })

  // Test cases
  it('displays instructions to the user', () => {
    cy.wait('@modules')

    cy.contains('This course is designed with English speakers in mind').should(
      'be.visible'
    )
  })
})
