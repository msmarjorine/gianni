/// <reference types="cypress"/>

describe("Handling autocomplete dropdown fields", () => {

    it("Select specific product via autocomplete list", () => {
        cy.visit('/')
        cy.get('#autocomplete-textfield').invoke('removeAttr', 'target').click()
        cy.get('h2.section_header').should('have.text', 'Autocomplete TextField')

        cy.get('#myInput').type('a')
        cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
            const prod = $el.text()
            const productToSelect = 'Avacado'

            if (prod === productToSelect) {
                $el.click()
                cy.get('#submit-button').click()
                cy.url().should('include', productToSelect)
            }
        }).then(() => {
            cy.get('#myInput').type('g')
            cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
                const prod = $el.text()
                const productToSelect = 'Grapes'

                if (prod === productToSelect) {
                    $el.click()
                    cy.get('#submit-button').click()
                    cy.url().should('include', productToSelect)
                }
            })
        })
    })

})