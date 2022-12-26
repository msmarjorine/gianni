/// <reference types="cypress"/>

describe("Check the Contact Us page", () => {

    it("Should open the Contact Us page", () => {
        cy.visit('https://www.automationteststore.com/')
        cy.get('ul.info_links_footer li a[href*="contact"]').click().then(function (linkText) {
            console.log("The link " + linkText.text() + " was clicked")
            cy.log("The link " + linkText.text() + " was clicked")
        })
    })
    

})