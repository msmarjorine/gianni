import Homepage_PO from "../../support/pageObjects/university/uni_homepage_po"

/// <reference types="cypress"/>

describe("Test Contact Us form via WebdriverUni", () => {

    before(function(){
        cy.fixture('example').then(function (data) {
            //this.data = data;
            globalThis.data = data
        })
    })

    beforeEach("Open the page", () => {
        const homepage_PO = new Homepage_PO();
        homepage_PO.visitUniContactpage();
        
        cy.title().should('eq', 'WebDriver | Contact Us')
        cy.get('h2[name="contactme"]').should('have.text', 'CONTACT US')
    })

    it("The UI should look correctly", () => {
        cy.get('body').should('have.css', 'background-color', 'rgb(29, 29, 29)')
        cy.get('h2[name="contactme"]').should('have.css', 'color', 'rgb(230, 44, 33)')
        cy.get('nav.navbar').should('have.class', 'navbar-fixed-top')
        cy.get('input[value="RESET"]').should('have.css', 'border-radius', '5px')

    })

    it("Should be able to submit a successful submission via contact us form", () => {
        //cy.get('input[name="first_name"]').type(data.first_name)
        //cy.get('input[name="last_name"]').type(data.last_name)
        //cy.get('input[name="email"]').type(data.email)
        //cy.get('textarea[name="message"]').type(data.message)
        //cy.get('input[value="SUBMIT"]').click()
        //cy.get('h1').should('have.text', 'Thank You for your Message!')

        cy.webdriveruniContactUs(data.first_name, data.last_name, data.email, data.message, 'h1', 'Thank You for your Message!')
    });

    it("Should not be able to submit a successful submission via contact us form as all fields are required", () => {

        if (Cypress.isBrowser('firefox')) {
            cy.log("You are using Firefox, bruh")
        } else {
            cy.webdriveruniContactUs(data.first_name, data.last_name, ' ', data.message, 'body', 'Error: Invalid email address')
        }
    });

    it("Should be able to reset a contact us form", () => {
        cy.get('input[name="first_name"]').type(data.first_name)
        cy.get('input[name="last_name"]').type(data.last_name)
        cy.get('input[name="email"]').type(data.email)
        cy.get('textarea[name="message"]').type(data.message)
        cy.get('input[value="RESET"]').click()
        cy.get('input[name="first_name"]').should('have.value', "")
        cy.get('input[name="last_name"]').should('have.value', "")
        cy.get('input[name="email"]').should('have.value', "")
        cy.get('textarea[name="message"]').should('have.value', "")
        
    });
})

