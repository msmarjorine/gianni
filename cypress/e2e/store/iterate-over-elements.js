/// <reference types="cypress"/>

describe("Iterate over elements", () => {

    beforeEach(() => {
        cy.visit('https://www.automationteststore.com/')
        cy.get('ul.categorymenu li a[href*="product/category&path="]').contains('Hair Care').click()
    })

    it("Log information of all haircare products", () => {
        cy.get('div.fixed_wrapper .prdocutname').each(($el, index, $list) => {
          cy.log('Index: ' + index + ': ' + $el.text())
        })
    })
    it("Add specific product to basket", () => {
        cy.selectProduct('Curls to straight Shampoo')
        cy.get('ul.productpagecart a').click()
        cy.url().should('include', 'checkout/cart')
    })

    it("Add another specific product to basket", () => {
        cy.selectProduct('Seaweed Conditioner')
        cy.get('ul.productpagecart a').click()
        cy.url().should('include', 'checkout/cart')
    })

    it("Add the third specific product to basket", () => {
        cy.selectProduct('Pantene Pro-V Conditioner, Classic Care')
        cy.get('ul.productpagecart a').click()
        cy.url().should('include', 'checkout/cart')
    })


})