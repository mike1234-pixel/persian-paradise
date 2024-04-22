import phrases from '../../fixtures/1-phrases.json'
import colours from '../../fixtures/mini-module-colours.json'

/// <reference types="cypress" />

describe('initial load', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept(
      {
        method: 'GET',
        url: '/api/modules'
      },
      [phrases, colours]
    ).as('modules')
  })

  it('displays button once loaded', () => {
    cy.wait('@modules')
    cy.contains('loading...').should('not.exist')
    cy.contains('Start Learning').should('be.visible')
  })

  it('takes the user through the journey of completing a module', () => {
    cy.contains('Colours').click()
    cy.wait(1000)

    cy.get('input[placeholder="Answer in Persian"]').click().type('rang')
    cy.contains('Next Phrase').click()

    cy.get('input[placeholder="Answer in Persian"]').click().type('rangha')
    cy.contains('Next Phrase').click()

    cy.get('input[placeholder="Answer in Persian"]')
      .click()
      .type('che ràngi doost dari')
    cy.contains('Next Phrase').click()

    cy.contains('Module Complete').should('be.visible')
  })
})
