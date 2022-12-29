/// <reference types="cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe("Make a search request using the custom command", () => {

    before(() => {
        cy.visit('http://new.gramota.ru')
        cy.get('#logo').should('be.visible')
        cy.get('#checkWord').should('have.attr', 'action').and('contain', 'gramota.ru/slovari/dic')
    })

    it("Make and verify a search request", () => {
        cy.searchGramota(Cypress.env('gramotaReq'))
    })
    


})