/// <reference types="cypress"/>

describe("Global feed of the app", () => {
  it("Verify the global feed as it is", () => {
    cy.visit("/")
    cy.get("a.nav-link").contains("Global Feed").as("globFeed")
    cy.get("@globFeed").should("have.class", "active")
    cy.get("div.article-preview").as("articlesList")
    cy.get("@articlesList").should("have.length", 10)
    cy.get("ul.pagination").should("be.visible")
    })

  it("Mock the data in the global feed", () => {
    cy.intercept("GET", "**/api/articles*", {fixture: 'mockArticles.json'}).as("articles")
    cy.visit("/")
    cy.get("a.nav-link").contains("Sign in").click()
    cy.get("input[formcontrolname='email']").type("cucumber@legumes.fr")
    cy.get("input[formcontrolname='password']").type("SunWater35")
    cy.get("button[type='submit']").click()
    cy.get("a.nav-link").contains("Global Feed").click()
    cy.get("div.article-preview").as("articlesList")
    cy.get("@articlesList").should("have.length", 3)
    //cy.wait("@articles")
  })

  })
  

