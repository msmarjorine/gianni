import Homepage_PO from "../../support/pageObjects/store/store_homepage_po"
import Contact_PO from "../../support/pageObjects/store/store_contactpage_po"

/// <reference types="cypress"/>

describe("Check the Contact Us page", () => {
    Cypress.config('defaultCommandTimeout', 20000)
    const homepage_PO = new Homepage_PO();
    const contact_PO = new Contact_PO();

    before(function () {
        cy.fixture('userDetails').then(function (data) {
            globalThis.data = data;
        })
    })

    beforeEach(() => {
        homepage_PO.visitStoreHomepage();
        homepage_PO.visitStoreContactpage();
    })

    it("Should open the Contact Us page and submit the form", () => {
        contact_PO.submitTheForm(data.first_name, data.email, "my enquiry")
        cy.url().should('contain', 'contact/success')
        cy.get('div.contentpanel').should('contain', 'Your enquiry has been successfully sent to the store owner!')
    })
    it("Should not be able to submit the form with invalid email", () => {
        contact_PO.submitTheForm(data.first_name, "test_email", "my enquiry")
        cy.url().should('not.contain', 'contact/success')
        cy.get('.help-block .has-error').should('have.text', ' E-Mail Address does not appear to be valid!')
    })
    

})