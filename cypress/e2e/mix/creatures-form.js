/// <reference types="cypress"/>

describe("Fill the form on eurobolat website", () => {

    before(function () {
        cy.fixture('bolat').then(function (data) {
            globalThis.data = data;
        })
    })
    it("Should fill the form with user data", () => {
        cy.visit(Cypress.env("bolatUrl") + 'calendar.html')
        cy.get('img[src*="bagniuk"]').should('be.visible')
        cy.get('#username').type(data.name)
        cy.get('#birthyear').type(data.year)
        cy.get('#submitCal').click()

        cy.url().should('contain', data.name).and('contain', data.year)
        cy.get('#rezultat').should('be.visible')
    })

})