/// <reference types="cypress"/>

describe("HAndle JS Alerts", () => {

    beforeEach(() => {
        cy.visit('http://www.webdriveruniversity.com/Popup-Alerts/index.html')
    })


    it("confirm JS alert contains the correct text", () => {
        cy.get('#button1').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('I am an alert box!')
        })
        
    })

    it("confirm JS confirm box works correctly when accepted", () => {
        cy.get('#button4').click()
        cy.on('window:confirm', (str) => {
            return true;
        })
        cy.get('#confirm-alert-text').should('be.visible')
        cy.get('#confirm-alert-text').should('have.text', 'You pressed OK!')
    })

    it("confirm JS confirm box works correctly when declined", () => {
        cy.get('#button4').click()
        cy.on('window:confirm', (str) => {
            return false;
        })
        cy.get('#confirm-alert-text').should('be.visible')
        cy.get('#confirm-alert-text').should('have.text', 'You pressed Cancel!')
    })

    it("confirm JS confirm box using a stub", () => {

        const stub = cy.stub()
        cy.on('window:confirm', stub)

        cy.get('#button4').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Press a button!')
        }).then(() => {
            return true
        }).then(() => {
            cy.get('#confirm-alert-text').should('be.visible')
            cy.get('#confirm-alert-text').should('have.text', 'You pressed OK!')
        })
        
    })

   
})