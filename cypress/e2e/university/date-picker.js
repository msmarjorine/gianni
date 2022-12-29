/// <reference types="cypress"/>

describe("Test Date Picker page on WebdriverUni", () => {

    beforeEach("Open the page", () => {
        cy.visit("/")
        cy.get("a#datepicker").invoke("removeAttr", "target")
        cy.get("a#datepicker").click()
        cy.title().should('eq', 'WebDriver | Datepicker')
        cy.get('#main-header h1').should('have.text', 'Datepicker')
    })

    //the first two tests were created just for training before the corresponding module of the course
    it.skip("The UI should look correctly", () => {
        cy.get('body').should('have.css', 'background-color', 'rgb(29, 29, 29)')
        cy.get('label').should('have.css', 'color', 'rgb(244, 89, 80)')
        cy.get('nav.navbar').should('have.class', 'navbar-fixed-top')
        cy.get('#datepicker input').should('have.css', 'z-index', '2')

    })
    it.skip("Should be able to pick a date", () => {
        cy.get('#datepicker input.form-control').click()
        cy.get('div.datepicker-days table.table-condensed thead th.next').click()
        cy.get('div.datepicker-days table.table-condensed thead th.next').click()
        cy.get('div.datepicker-days table.table-condensed tbody tr td.day').contains('13').click()
        cy.get('#datepicker input.form-control').should('have.value', '02-13-2023')
    });

    it("Select date from the datepicker", () => {
        cy.get('#datepicker').click()

        var date = new Date();
        date.setDate(date.getDate() + 67)

        var futureYear = date.getFullYear();
        var futureMonth = date.toLocaleString("en-gb" , { month: "long" });
        var futureDay = date.getDate();

        cy.log("Future year to select: " + futureYear)
        cy.log("Future month to select: " + futureMonth)
        cy.log("Future day to select: " + futureDay)

        function selectMonthAndYear() {
            cy.get('div.datepicker-dropdown').find('.datepicker-switch').first().then(currentDay => {
                if (!currentDay.text().includes(futureYear)) {
                    cy.get('.next').first().click();
                    selectMonthAndYear();
                }
            }).then(() => {
                cy.get('div.datepicker-dropdown').find('.datepicker-switch').first().then(currentDay => {
                    if (!currentDay.text().includes(futureMonth)) {
                        cy.get('.next').first().click();
                        selectMonthAndYear();
                    }
                })
            })
        }

        function selectDay() {
            cy.get('[class="day"]').contains(futureDay).click()
        }
        selectMonthAndYear();
        selectDay();

    })


})

