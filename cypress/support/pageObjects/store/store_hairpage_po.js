class Haircare_PO {
    addProductToBasket() {
        globalThis.data.productName.forEach(function (element) {
            cy.addProductToBasket(element)
        })
        cy.get('.dropdown-toggle > .label').should('have.text', 3)
    }

}
export default Haircare_PO;