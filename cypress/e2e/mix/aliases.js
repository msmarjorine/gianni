/// <reference types="cypress"/>

describe("Practicing aliases", () => {
   
    it("Click on the Tennis link", () => {
        cy.visit('https://www.bbc.com/sport')
        cy.get('ul.ssrcss-min3p3-StyledMenuList').contains('Tennis').invoke('text').as('tennisLink')
            .then(() => {
                cy.log('@tennisLink')
            })
        cy.get('ul.ssrcss-min3p3-StyledMenuList').contains('Tennis').click()
        cy.url().should('contain', '/sport/tennis')
        cy.get('a.sp-c-global-header__logo').should('include.text', 'Sport')
        cy.get('div[role=banner]').as('yellowBanner')
        cy.get('@yellowBanner').should('have.css', 'background-color', 'rgb(255, 210, 48)')
    })

    it("Search input actions", () => {
        cy.visit('https://www.bbc.com/travel')
        cy.get('a#orbit-search-button').should('have.attr', 'title', 'Search BBC')
        cy.get('a#orbit-search-button').click()
        //the following code fails
        // Cypress detected a cross origin error happened on page load:
        cy.url().should('contain', 'FEATURE_SITES_GNL')
        cy.get('input#search-input').should('have.attr', 'placeholder', 'Search the BBC')
    })
})