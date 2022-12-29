/// <reference types="cypress"/>

describe("Main page of WebdriverUni", () => {

    beforeEach("Open the page", () => {
        cy.visit("/")
    })

    it("Styles and different assertions", () => {
        cy.title().should('eq', 'WebDriverUniversity.com')
        cy.url().should('include', 'versity')
        cy.get('h1[style="color:#f45950;"]').should('have.text', 'My Courses & Promo Codes')
        cy.get('div.col-md-12:nth-child(4)>a').should('have.attr', 'href').and('include', 'To-Do-List/index.html')
        cy.get('div.col-md-12:nth-child(4)>a>div.thumbnail>div.section-title>h1').should('have.text', 'TO DO LIST')
        cy.get('div.col-md-12:nth-child(4)>a>div.thumbnail>div.section-title>h1').should('have.css', 'textAlign', 'center')
    })

    it("Document assertions", () => {
        cy.document().its('contentType').should('eq', 'text/html')
        cy.document().its('charset').should('eq', 'UTF-8')
    });

    it("Request assertions", () => {
        cy.request({
            url: 'https://www.tesla.com/sites/default/files/Powerwall_2_Order_FR_French.pdf',
            encoding: 'binary',
        }).then((response) => {
            cy.writeFile('cypress/downloads/tesla.pdf', response.body, 'binary')
        })
        cy.request('POST', 'https://httpbin.org/post', { name: 'Arya', breed: 'Cockerjack' }).then(
            (response) => {
                // response.body is automatically serialized into JSON
                expect(response.body).to.have.property('json') // true
            }
        )
    });

})

