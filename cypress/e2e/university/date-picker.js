/// <reference types="cypress"/>

describe("Test Date Picker page on WebdriverUni", () => {

    beforeEach("Open the page", () => {
        cy.visit("http://www.webdriveruniversity.com")
        cy.get("a#datepicker").invoke("removeAttr", "target")
        cy.get("a#datepicker").click()
        cy.title().should('eq', 'WebDriver | Datepicker')
        cy.get('#main-header h1').should('have.text', 'Datepicker')
    })

    it("The UI should look correctly", () => {
        cy.get('body').should('have.css', 'background-color', 'rgb(29, 29, 29)')
        cy.get('label').should('have.css', 'color', 'rgb(244, 89, 80)')
        cy.get('nav.navbar').should('have.class', 'navbar-fixed-top')
        cy.get('#datepicker input').should('have.css', 'z-index', '2')

    })

    it("Should be able to pick a date", () => {
        cy.get('#datepicker input.form-control').click()
        cy.get('div.datepicker-days table.table-condensed thead th.next').click()
        cy.get('div.datepicker-days table.table-condensed thead th.next').click()
        cy.get('div.datepicker-days table.table-condensed tbody tr td.day').contains('13').click()
        cy.get('#datepicker input.form-control').should('have.value', '02-13-2023')
    });


})

