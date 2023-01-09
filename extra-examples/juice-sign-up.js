/// <reference types="cypress"/>

import Homepage_PO from "../support/pageObjects/homepage_po"
import RegisterPage_PO from "../support/pageObjects/register_po"

describe("Verify Sign Up functionality", () => {
    const homepage_po = new Homepage_PO();
    const register_po = new RegisterPage_PO();

    let randomString = Math.random().toString(36).substring(2);
    let randomEmail = randomString + "-post@stark.ws"
    let password = "secret987"
    let myQuestion = "to go hiking"
    let myAnswer = "Teide"

    describe("UI tests", () => {

        it("The page should load successfully", () => {
            homepage_po.visitHomepage()
            homepage_po.dismissModal()
            cy.get("#mat-dialog-0").should("not.exist")
            cy.getCookie("welcomebanner_status").should("exist").and("have.property", "value", "dismiss")
            homepage_po.acceptCookies()
            cy.get("div[aria-label='cookieconsent']").should("not.be.visible")
            cy.getCookie("cookieconsent_status").should("exist").and("have.property", "value", "dismiss")
            cy.get("div.mat-grid-tile-content").should("have.length", 12)

        })

        it("User should be able to sign up with valid creds", () => {
            cy.intercept("POST", "**/rest/user/login").as("loginRequest")

            homepage_po.visitHomepage()
            homepage_po.dismissModal()
            homepage_po.acceptCookies()
            homepage_po.goToSignup()
            cy.url().should("contain", "/register")
            register_po.submitSignUpForm(randomEmail, password, myQuestion, myAnswer)
            cy.get('.mat-snack-bar-container').contains('Registration completed successfully.')
            register_po.submitLoginForm(randomEmail, password)
            cy.get("button[aria-label='Show the shopping cart']").should("be.visible")

            cy.wait("@loginRequest").should(({ request, response }) => {
                expect(response.statusCode).to.eq(200)
                expect(request.body.email).to.eq(randomEmail)
                expect(response.body.authentication.umail).to.eq(randomEmail)
            })

        })

    })

    describe("API tests", () => {
        const userCreds = {
            "email": randomEmail,
            "password": password
        }
        it("Login via API", () => {
            cy.request("POST", "rest/user/login", userCreds).then(response => {
                expect(response.status).to.eq(200)
            })
        })
        it("Login via token", () => {
            cy.request("POST", "rest/user/login", userCreds)
                .its("body").then(body => {
                    const token = body.authentication.token
                    cy.wrap(token).as("userToken")

                    const userToken = cy.get("@userToken")
                    cy.visit("/", { onBeforeLoad(browser) {
                        browser.localStorage.setItem("token", userToken)
                    }
                    })
                    cy.wait(200)
                    homepage_po.dismissModal()
                    cy.get("button[aria-label='Show the shopping cart']").should("be.visible")

                })
        })

    })

    
    


})