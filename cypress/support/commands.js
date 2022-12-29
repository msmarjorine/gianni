// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("selectProduct", productName => {
    cy.get('div.fixed_wrapper .prdocutname').each(($el, index, $list) => {
        if ($el.text().includes(productName)) {
            cy.wrap($el).click()
        }

    })
})

Cypress.Commands.add("addProductToBasket", productName => {
    cy.get('div.fixed_wrapper .prdocutname').each(($el, index, $list) => {
        if ($el.text() === productName) {
            cy.log($el.text())
            cy.get('.productcart').eq(index).click()
        }

    })
})

Cypress.Commands.add("navigate_to_uni_homepage", () => {
    cy.visit('/');
})

Cypress.Commands.add("navigate_to_uni_checkbox_page", () => {
    cy.visit('/');
    cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
})

Cypress.Commands.add("webdriveruniContactUs", (firstName, lastName, email, message, $selector, textToVerify) => {
    cy.get('input[name="first_name"]').type(firstName)
    cy.get('input[name="last_name"]').type(lastName)
    cy.get('input[name="email"]').type(email)
    cy.get('textarea[name="message"]').type(message)

    cy.get('input[value="SUBMIT"]').click()
    cy.get($selector).contains(textToVerify)
})

Cypress.Commands.add("searchGramota", (request) => {
    cy.get('input[name="word"]').type(request)
    cy.get('#checkWord input[type="submit"]').click()
    cy.url().should('contain', request)
    cy.get('h1.inside').should('have.css', 'backgroundColor', 'rgb(40, 180, 100)')
})

