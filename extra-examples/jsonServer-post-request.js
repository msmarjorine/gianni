/// <reference types="cypress"/>

describe("POST request", () => {
    var titlesOfPosts = new Array();
    let randomTitle = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);

    it("Create a new post and validate status code", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3000/posts",
            body: {
                title: randomTitle,
                author: "hacker111"
            }
        }).then(response => {
            expect(response.status).to.eql(201)
        })

    })

    it("Validate title of the latest post", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/posts",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            response.body.forEach(function (item) {
                titlesOfPosts.push(item["title"])
            })
        }).then(() => {
            var latestPost = titlesOfPosts[titlesOfPosts.length - 1]
            expect(latestPost).to.eq(randomTitle)
        })
    })


})