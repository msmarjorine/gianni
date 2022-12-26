/// <reference types="cypress"/>

describe("Handling iFrames and Modals", () => {

    it("Handle Webdriveruni iFrame and Module", () => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('a#iframe').invoke('removeAttr', 'target').click()
        cy.get('#nav-title').should('have.text', 'WebdriverUniversity.com (IFrame)')

        cy.get('#frame').then($iframe => {
            const body = $iframe.contents().find('body')
            cy.wrap(body).as('iframeBody')
        })

        cy.get('@iframeBody').find('#button-find-out-more').click()
        cy.get('@iframeBody').find('#myModal').as('modal')
        cy.get('@modal').find('div.modal-body').should('include.text', 'Welcome to webdriveruniversity.com we sell a wide range of electrical goods')
        cy.get('@modal').find('div.modal-footer button:nth-child(1)').click()
        cy.get('@modal').should('not.be.visible')
    })

    it.skip("Handle youTube video on eurobolat website", () => {
        cy.visit('https://eurobolat.000webhostapp.com/')
        cy.get('#emenu a[href*="music"]').click()
        cy.url().should('include', 'music.html')

        cy.get('iframe[src$="/CVXiXK-s9cI"]').then($iframeBodypaint => {
            const body = $iframeBodypaint.contents().find('head')
            cy.wrap(body).as('bodypaint')

        })

        cy.get('@bodypaint').find('title').should('have.text', 'Arctic Monkeys: Body Paint | The Tonight Show Starring Jimmy Fallon - YouTube')
    })

})