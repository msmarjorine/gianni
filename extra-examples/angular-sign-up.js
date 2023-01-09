/// <reference types="cypress"/>

describe("Sign Up and Login to the application", () => {

  let randomString = Math.random().toString(36).substring(2);
  let randomName = "imya" + randomString;
  let randomEmail = randomString + "@mail.tw";
  let password = "Ragnar0ck";
  let number = Math.floor(Math.random() * 200);

  it("Should be able to sign up with valid data", () => {
    cy.intercept("POST", "**/*.realworld.io/api/users").as("newUser")

    cy.visit("/")
    cy.get("a[ng-reflect-router-link='/register']").click()
    cy.get("h1.text-xs-center").should('be.visible').and("have.text", "Sign up")
    cy.get("input[formcontrolname='username']").type(randomName)
    cy.get("input[formcontrolname='email']").type(randomEmail)
    cy.get("input[formcontrolname='password']").type(password)
    cy.get("a[ng-reflect-router-link='/register']").should("contain.text", "Sign up")
    cy.get("button.btn-primary").click()
    cy.get("a[ng-reflect-router-link*='profile']").should("be.visible").and("contain", randomName)

    cy.wait("@newUser").should(({ request, response }) => {
      expect(response.statusCode).to.eq(200)
      expect(request.body.user.username).to.eq(randomName)
      expect(request.body.user.email).to.eq(randomEmail)
    })
  })

  it.skip("Should not be able to sign up with already existing username", () => {
    cy.intercept("POST", "**/*.realworld.io/api/users").as("oldUser")

    cy.visit("/")
    cy.get("a[ng-reflect-router-link='/register']").click()
    cy.get("h1.text-xs-center").should('be.visible').and("have.text", "Sign up")
    cy.get("input[formcontrolname='username']").type("admin")
    cy.get("input[formcontrolname='email']").type("admin@admin.tw")
    cy.get("input[formcontrolname='password']").type("admin")
    cy.get("a[ng-reflect-router-link='/register']").should("contain.text", "Sign up")
    cy.get("button.btn-primary").click()
    cy.get("ul.error-messages").should("be.visible")
      .and("contain.text", "username has already been taken")
      .and("have.css", "color", "rgb(184, 92, 92)")

    cy.wait("@oldUser").should(({ request, response }) => {
      expect(response.statusCode).to.eq(422)
      expect(request.body.user.username).to.eq("admin")
      expect(request.body.user.email).to.eq("admin@admin.tw")
      expect(response.body.errors.username).to.contain("has already been taken")
    })
  })

  it("Test valid login & Mock popular tags", () => {
    cy.intercept("GET", "**/api/tags", {fixture: 'popularTags.json'})
    cy.intercept("POST", "**/*.realworld.io/api/users/login").as("loggedUser")

    cy.visit("/")
    cy.get("a.nav-link").contains("Sign in").click()
    cy.get("h1.text-xs-center").should('be.visible').and("have.text", "Sign in")
    cy.get("input[formcontrolname='email']").type(randomEmail)
    cy.get("input[formcontrolname='password']").type(password)
    cy.get("button[type='submit']").click()
    cy.get("a[ng-reflect-router-link*='profile']").should("be.visible").and("contain", randomName)
    cy.get("div.tag-list").should("contain", "Furmione")

    cy.wait("@loggedUser").should(({ request, response }) => {
      expect(response.statusCode).to.eq(200)
      expect(request.body.user.email).to.eq(randomEmail)
      expect(request.body.user.password).to.eq(password)
      expect(response.body.user.image).to.contain("smiley-cyrus.jpeg")
    })
  })

  it("Create a new article", () => {
    cy.intercept("POST", "**/*.realworld.io/api/articles").as("publishedArticle")

    cy.visit("/login")
    cy.get("input[formcontrolname='email']").type(randomEmail)
    cy.get("input[formcontrolname='password']").type(password)
    cy.get("button[type='submit']").click()
    cy.get("a[href$='editor']").click()
    cy.get("input[formcontrolname='title']").type("New Article number " + number)
    cy.get("input[formcontrolname='description']").type("Description: " + number)
    cy.get("input[formcontrolname='description']").type("Description: " + number)
    cy.get("textarea[formcontrolname='body']").type("A u luzi chervona kalyna pohylilasya")
    cy.get("input[placeholder='Enter tags']").type("Tag 1").type('{enter}')
    cy.get("input[placeholder='Enter tags']").type("Tag 2").type('{enter}')
    cy.get("button").contains("Publish Article").click()
    cy.get("h1").should("contain.text", "New Article number ")

    cy.wait("@publishedArticle").should(({ request, response }) => {
      expect(response.statusCode).to.eq(200)
      expect(request.body.article.title).to.contain(number)
      expect(response.body.article.author.username).to.eq(randomName)
      expect(response.headers).to.have.property("report-to")
    })
  })

})

