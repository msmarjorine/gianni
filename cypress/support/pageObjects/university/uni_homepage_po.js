class Homepage_PO {
    visitUniHomepage() {
        cy.visit("/");
    }
    visitUniContactpage() {
        cy.visit("/");
        cy.get("a#contact-us").invoke("removeAttr", "target")
        cy.get("a#contact-us").click()
    }

}
export default Homepage_PO;