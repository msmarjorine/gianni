/// <reference types="cypress"/>

describe("Cypress web security", () => {

    it.skip("Validate visiting 2 different domains", () => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.visit('https://www.automationteststore.com/')
    })

    it("Validate visiting 2 different domains via user actions", () => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('#automation-test-store').invoke('removeAttr', 'target').click()
    })

    it("Origin command", () => {
        cy.origin('webdriveruniversity.com', () => {
            cy.visit('/')
        })
        cy.origin('automationteststore.com', () => {
            cy.visit('/')
        })
    })

})