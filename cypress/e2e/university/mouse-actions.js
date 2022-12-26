/// <reference types="cypress"/>

describe("Mouse actions", () => {

    it("Scroll elements into view", () => {
        cy.visit('http://www.webdriveruniversity.com/')
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click()
        cy.get('#main-header').should('have.text', 'The Key to Success is to take massive ACTION!')
    })
    it("Drag and drop", () => {
        cy.visit('http://www.webdriveruniversity.com/Actions/index.html')
        cy.get('#draggable').trigger('mousedown', { which: 1 })
        cy.get('#droppable').trigger('mousemove').trigger('mouseup', { force: true })
        cy.get('#droppable p').should('have.css', 'backgroundColor', 'rgb(244, 89, 80)')
    })
    it("Double click", () => {
        cy.visit('http://www.webdriveruniversity.com/Actions/index.html')
        cy.get('#double-click').dblclick()
        cy.get('#double-click').should('have.css', 'backgroundColor', 'rgb(147, 203, 90)')
    })
    it("Click and hold", () => {
        cy.visit('http://www.webdriveruniversity.com/Actions/index.html')
        cy.get('#click-box').trigger('mousedown', { which: 1 }).then(($element) => {
            expect($element).to.have.css('backgroundColor', 'rgb(0, 255, 0)')
        })

    })
    

})