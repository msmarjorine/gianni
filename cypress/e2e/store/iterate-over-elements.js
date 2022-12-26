/// <reference types="cypress"/>

describe("Iterate over elements", () => {

    it("Log information of all haircare products", () => {
        cy.visit('https://www.automationteststore.com/')
        cy.get('ul.categorymenu li a[href*="product/category&path="]').contains('Hair Care').click()

        cy.get('div.fixed_wrapper .prdocutname').each(($el, index, $list) => {
          cy.log('Index: ' + index + ': ' + $el.text())
        })
    })
    it("Add specific product to basket", () => {
        cy.visit('https://www.automationteststore.com/')
        cy.get('ul.categorymenu li a[href*="product/category&path="]').contains('Hair Care').click()

        cy.get('div.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            if ($el.text().includes('Curls to straight Shampoo')) {
                cy.wrap($el).click()
                cy.get('ul.productpagecart a').click()
                cy.url().should('include', 'checkout/cart')
            }
            
        })
    })


})