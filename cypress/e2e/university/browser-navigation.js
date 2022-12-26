/// <reference types="cypress"/>

describe("Validate Webdriveruni homepage links", () => {

    it("Confirm links redirect to the correct pages", () => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('a#contact-us').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'contactus.html')

        cy.go('back')
        cy.title().should('eq', 'WebDriverUniversity.com')
        cy.reload()
        cy.reload(true) //force reload, without cache

        cy.go('forward')
        cy.url().should('include', 'contactus.html')

        cy.go('back')
        cy.get('a#login-portal').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'Login-Portal/')
        cy.go('back')
        cy.get('a#to-do-list').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'To-Do-List/')
        cy.go('back')

    })

    it("Clicking back and forth", () => {
        cy.visit('https://docs.cypress.io/api/table-of-contents')
        cy.get('li.mb-4 a[href*="commands/rightclick"]').as('rightClickLink')
        cy.get('@rightClickLink').click()
        cy.url().should('eq', 'https://docs.cypress.io/api/commands/rightclick')
        cy.get('footer.bg-white.clear-both').scrollIntoView()
        cy.go('back')
        cy.title().should('eq', 'Table of Contents | Cypress Documentation')
        cy.go('forward')
        cy.title().should('eq', 'rightclick | Cypress Documentation')
        cy.reload(true)
    })
})