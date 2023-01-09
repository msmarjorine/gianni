/// <reference types="cypress"/>

describe("Comments endpoint test", () => {
    var randomId = Math.random() * 100;
    var randomBody = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    var bodiesOfPosts = new Array();

    it("Post a new comment", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3000/comments",
            body: {
                postId: randomId,
                body: randomBody
                }
        }).then(response => {
            expect(response.status).to.eql(201)
        })
    })
    it("Verify the body of the latest comment", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/comments",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            response.body.forEach(function (item) {
                bodiesOfPosts.push(item["body"])
            })
        }).then(() => {
            var latestBody = bodiesOfPosts[bodiesOfPosts.length - 1]
            expect(latestBody).to.eq(randomBody)
            cy.log(bodiesOfPosts.length)
        })
    })
    it("Delete the created comment", () => {
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/comments/" + bodiesOfPosts.length
        }).then((response) => {
            expect(response.status).to.eql(200);
        });
        
        })
    })
