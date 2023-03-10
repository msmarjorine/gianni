class Homepage_PO {
    visitStoreHomepage() {
        cy.visit("https://www.automationteststore.com/");
    }
    visitStoreContactpage() {
        cy.get('.info_links_footer > li > a').contains('Contact Us').click()
    }
    clickOnHairProducts() {
        cy.get('ul.categorymenu li a[href*="product/category&path="]').contains('Hair Care').click()
    }
    makeSearchRequest(request) {
        cy.get("#filter_keyword").type(request).type("{enter}")
    }

}
export default Homepage_PO;