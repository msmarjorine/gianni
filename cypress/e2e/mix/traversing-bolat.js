/// <reference types="Cypress" />

describe("Some commands that let us do traversing", () => {

    beforeEach(() => {
        cy.visit('https://eurobolat.000webhostapp.com/')
    })


    it("Accessing elements in nav-menu", () => {
        cy.get('#emenu').children('li').should('have.length', 6)
        cy.get('#emenu').children('li').eq(4).as('calendar')
        cy.get('@calendar').children('a').should('have.attr', 'href').and('include', 'calendar')

        cy.get('a[href*="eurotrips"]').closest('ul').should('have.attr', 'id').and('eq', 'emenu')
    })

    it("Find a quote", () => {
        cy.get('section.grid-two').find('.grid-item-two').find('p').should('have.attr', 'id').and('eq', 'pazanskaya')
    })

    it.only("Find an email", () => {
        cy.get('#efooter > *').not('#foot3').should('have.css', 'marginLeft', '10px')
    })
})