/// <reference types="cypress"/>

describe("Alias and Invoke", () => {

    beforeEach(() => {
        cy.visit('https://www.automationteststore.com/')
    })

    it("Validate a specific haircare product", () => {
        cy.get('ul.categorymenu li a[href*="product/category&path="]').contains('Hair Care').click()
        cy.get('div.fixed_wrapper .prdocutname').eq(0).invoke('text').as('productThumbnail')
        cy.get('@productThumbnail').its('length').should('be.gt', 5)
        cy.get('@productThumbnail').should('include', 'Seaweed')

    })

    it("Validate the number of products", () => {
        cy.get('div.thumbnail').its('length').as('productsNumber')
        cy.get('@productsNumber').should('eq', 16)
        cy.get('a.productcart').eq(0).invoke('attr', 'title').as('cartText')
        cy.get('@cartText').should('equal', 'Add to Cart')
    })

    it("Validate the header", () => {
        cy.get('div.navbar-collapse').as('header')
        cy.get('@header').should('be.visible')
        cy.get('@header').should('have.css', 'border-color', 'rgb(16, 16, 16)')
    })

    it.only("Calculate total of normal and sale products", () => {
        cy.get('div.thumbnail').as('productThumbnail')
        //cy.get('@productThumbnail').find('.oneprice').each(($el, index, $list) => {
        //    cy.log($el.text())
        //})
        cy.get('div.thumbnail').find('.oneprice').invoke('text').as('itemPrice')
        cy.get('div.thumbnail').find('.pricenew').invoke('text').as('itemSalePrice')

        var itemsTotal = 0;
        cy.get('@itemPrice').then($linkText => {
            var itemsPriceTotal = 0;
            var itemPrice = $linkText.split('$');
            var i;
            for (i = 0; i < itemPrice.length; i++) {
                cy.log(itemPrice[i])
                itemsPriceTotal += Number(itemPrice[i])
                
            }
            cy.log("Total of full price products: " + itemsPriceTotal)
            itemsTotal += itemsPriceTotal;
        })
        cy.get('@itemSalePrice').then($linkText => {
            var itemsSalePriceTotal = 0;
            var itemSalePrice = $linkText.split('$');
            var i;
            for (i = 0; i < itemSalePrice.length; i++) {
                cy.log(itemSalePrice[i])
                itemsSalePriceTotal += Number(itemSalePrice[i])

            }
            itemsTotal += itemsSalePriceTotal;
            cy.log("Total of sale price products: " + itemsSalePriceTotal)
        })
            .then(() => {
                cy.log("The price of all products together: " + itemsTotal)
                expect(itemsTotal).to.equal(625.6)
            })
     })
        
 })