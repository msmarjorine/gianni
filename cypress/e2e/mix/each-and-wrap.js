/// <reference types="cypress"/>

describe("Iterate over the list items on eurobolat", () => {
    beforeEach(() => {
        cy.visit('https://eurobolat.000webhostapp.com/')
    })
    it("Log all names", () => {
        cy.get('#emenu li a').each(($el, index, $list) => {
            cy.log('Section number ' + index + ': ' + $el.text())
        })
    })
    it("Go to the History page", () => {
        //doesn't work Ч can be because of cyrillycs?
        cy.get('#emenu li a').each(($el, index, $list) => {
            if ($el.text().includes('истори€')) {
                cy.wrap($el).click()
            }
        })
    })
})

describe("Iterate over the list items on Vention", () => {
    it("Log all names", () => {
        cy.viewport(1366, 768)
        cy.visit('https://vention.io/')
        cy.get('button[type="submit"] span.icon-close').click({ force: true })
        cy.get('button.nav-link').each(($el, index, $list) => {
            cy.log('Section number ' + index + ': ' + $el.text())
        })
    })

    it("Go to the Designs page", () => {
        cy.viewport(1366, 768)
        cy.get('button.nav-link').each(($el, index, $list) => {
            if ($el.text().includes('Designs')) {
                cy.wrap($el).click()
                cy.get('a.link-column-item-link[href*="category=MT"]').click()
            }
        })
        cy.get('h1.listing-page-heading').should('have.text', 'Machine Tending ')

    })
})