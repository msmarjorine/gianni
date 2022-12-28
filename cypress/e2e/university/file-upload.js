/// <reference types="cypress"/>

describe("Verify file uploading feature", () => {
    it("Upload a file to Webdriveruni page", () => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('#file-upload').invoke('removeAttr', 'target').click()
        cy.get('#main-header').should('contain', 'File Upload')

        cy.get('#myFile').selectFile('cypress/fixtures/IMG_0210.jpg')
        cy.get('#submit-button').click()
        cy.url().should('contain', 'IMG_0210')
    })
    it("Upload no file", () => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('#file-upload').invoke('removeAttr', 'target').click()
        cy.get('#submit-button').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('You need to select a file to upload!')
        })

    })
})