/// <reference types="cypress"/>

describe("Verify Cookie Banner on CardinalPath", () => {

    it("The cookie should be set when the banner is closed", () => {
        cy.visit('https://www.cardinalpath.com/')
        cy.get('#onetrust-banner-sdk').should('be.visible')
        cy.getCookie('OptanonAlertBoxClosed').should('not.exist')
        cy.get('#onetrust-accept-btn-handler').click().then(() => {
            cy.get('#onetrust-banner-sdk').should('not.be.visible')
            cy.getCookie('OptanonAlertBoxClosed').should('exist')
        })

    })



})