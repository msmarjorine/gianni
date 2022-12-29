class Contact_PO {
    submitTheForm(name, email, enquiry) {
        cy.get('#ContactUsFrm_first_name').type(name)
        cy.get('#ContactUsFrm_email').type(email)
        cy.get('#ContactUsFrm_enquiry').type(enquiry)
        cy.get('button[title="Submit"]').click()
    }

}
export default Contact_PO;