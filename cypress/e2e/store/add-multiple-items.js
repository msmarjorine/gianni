import Homepage_PO from "../../support/pageObjects/store/store_homepage_po"
import Haircare_PO from "../../support/pageObjects/store/store_hairpage_po"

/// <reference types="cypress"/>

describe("Add multiple items to the basket", () => {

    const homepage_PO = new Homepage_PO();
    const haircare_PO = new Haircare_PO();

    before(function () {
        cy.fixture('hair-products').then(function (data) {
            globalThis.data = data;
        })
    })

    beforeEach(() => {
        homepage_PO.visitStoreHomepage()
        homepage_PO.clickOnHairProducts()
    })

    it("Add specific items to the basket", () => {
        haircare_PO.addProductToBasket()
    })



})