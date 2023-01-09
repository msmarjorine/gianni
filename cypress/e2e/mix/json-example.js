/// <reference types="cypress"/>

describe("JSON object", () => {

    
    it("JSON object examples", () => {
        const exampleObject = {
            "key": "value",
            "key2": "value2"
        }
        const exampleArrayOfValues = [
            "Arya",
            "John",
            "Sansa"
        ]

        const users = {
            "firstName": "John",
            "lastName": "Pooh",
            "age": 36,
            "students": [
                {
                    "firstName": "Arya",
                    "lastName": "Stark",
                    "age": 16
                },
                {
                    "firstName": "John",
                    "lastName": "Snow",
                    "age": 19
                }
            ]
        }

        const exampleArrayOfObjects = [
            {
                "product": "coffee",
                "label": "Jacobs",
                "price": 19
            },
            {
                "product": "tea",
                "label": "Greenfiled",
                "price": 5
            },
            {
                "product": "cream",
                "label": "Barista",
                "price": 4
            }
        ]

        cy.log(exampleObject["key"]) //value
        cy.log(exampleObject["key2"]) //value2

        cy.log(exampleObject.key)
        cy.log(exampleObject.key2)

        cy.log(exampleArrayOfValues[0]) //Arya
        cy.log(exampleArrayOfValues[1]) //John

        cy.log(users.students[1].lastName) //Snow

        cy.log(exampleArrayOfObjects[2].label) //Barista
        cy.log(exampleArrayOfObjects[0].product + " " + exampleArrayOfObjects[1].product + " " + exampleArrayOfObjects[2].product) //all the products
    })

    

})