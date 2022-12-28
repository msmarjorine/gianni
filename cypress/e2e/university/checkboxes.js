/// <reference types="cypress"/>

describe("Handling checkboxes", () => {

    beforeEach(() => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('#main-header h1').should('have.text', 'Dropdown Menu(s), Checkboxe(s) & Radio Button(s)')
    })

    it("Check and validate checkboxes", () => {
        cy.get('#checkboxes input[value="option-1"]').check().should('be.checked')
        cy.get('#checkboxes input[value="option-3"]').uncheck().should('not.be.checked')

    })

    it("Check multiple checkboxes", () => {
        cy.get('input[type="checkbox"]').check(["option-1", "option-4"]).should('be.checked')

    })

})

describe("Handling radiobuttons", () => {

    beforeEach(() => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('#main-header h1').should('have.text', 'Dropdown Menu(s), Checkboxe(s) & Radio Button(s)')
    })

    it("Check and validate radiobuttons", () => {
        cy.get('#radio-buttons').find('[type="radio"]').first().check()
        cy.get('#radio-buttons').find('[type="radio"]').eq(1).check()
    })

    it("Validate the states of specific radiobuttons", () => {
        cy.get('input[value="lettuce"]').should('not.be.checked')
        cy.get('input[value="cabbage"]').should('be.disabled')
        cy.get('input[value="pumpkin"]').should('be.checked')
    })
})

describe("Handling dropdown menus", () => {

    beforeEach(() => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('#main-header h1').should('have.text', 'Dropdown Menu(s), Checkboxe(s) & Radio Button(s)')
    })

    it("Select specific values via select dropdown lists", () => {
        cy.get('#dropdowm-menu-1').select('python')
        cy.get('#dropdowm-menu-2').select('testng').should('have.value', 'testng')
        cy.get('#dropdowm-menu-3').select('jquery')

        cy.get('#dropdowm-menu-2').select('maven').should('have.value', 'maven')
        cy.get('#dropdowm-menu-2').select('Maven').contains('Maven')

    })

})