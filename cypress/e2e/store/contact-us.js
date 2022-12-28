/// <reference types="cypress"/>

describe("Check the Contact Us page", () => {

    before(function () {
        cy.fixture('userDetails').as('user')
    })

    it("Should open the Contact Us page", () => {
        cy.visit('https://www.automationteststore.com/')
        cy.get('ul.info_links_footer li a[href*="contact"]').click().then(function (linkText) {
            console.log("The link " + linkText.text() + " was clicked")
            cy.log("The link " + linkText.text() + " was clicked")
        })

        cy.get('@user').then((user) => {
            cy.get('#ContactUsFrm_first_name').type(user.first_name)
            cy.get('#ContactUsFrm_email').type(user.email)
        })

        cy.get('#ContactUsFrm_enquiry').type("my enquiry")
        cy.get('button[title="Submit"]').click()

        cy.url().should('contain', 'contact/success')
        cy.get('div.contentpanel').should('contain', 'Your enquiry has been successfully sent to the store owner!')
    })
    

})