/// <reference types="cypress"/>

import Homepage_PO from "../support/pageObjects/homepage_po"
import RegisterPage_PO from "../support/pageObjects/register_po"

describe.skip("Verify Sign Up functionality", () => {
    const homepage_po = new Homepage_PO();
    const register_po = new RegisterPage_PO();

    let randomString = Math.random().toString(36).substring(2);
    let randomEmail = randomString + "-post@stark.ws"
    let password = "secret987"

    before(() => {
        homepage_po.visitHomepage()
        homepage_po.dismissModal()
        homepage_po.acceptCookies()
        homepage_po.goToSignup()
        register_po.submitSignUpForm(randomEmail, password, "to go hiking", "Teide")
        register_po.submitLoginForm(randomEmail, password)
    })  

    it("User should be able to add products to the basket", () => {

    })

})