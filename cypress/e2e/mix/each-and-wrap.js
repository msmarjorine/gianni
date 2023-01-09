/// <reference types="cypress"/>

describe("Iterate over the list items on eurobolat", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("bolatUrl"))
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

