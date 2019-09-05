import { createVerify } from "crypto";

// https://docs.cypress.io/api/introduction/api.html

describe('Testing Sign up flow', () => {

    it('Checks failed validation for the wrong email', () => {
        cy.visit('/auth/sign-up')
        cy.get('input[type="email"]').type('admin')
        cy.get('form ul > li:first').should('contain', 'Does not match the email')
    })


    it('Checks error when password do not match', () => {
        cy.visit('/auth/sign-up')
        cy.get('input[type="email"]').type('admin@gmail.com')
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="password-confirmation"]').type('pass')
        cy.get('form ul > li:first').should('contain', 'Does not match password')
    })

    it('Fills the form and click on submit', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '*api/v1/sign*',
            response: {
                status: 200,
                token: '123456'
            }
        }).as('signUp')
        cy.route({
            method: 'GET',
            url: '*api/v1/users/current*',
            headers: {
                Authorization: '123456'
            },
            response: {
                status: 200,
                current_user: {
                    id: 1,
                    email: 'ololo@gmail.com'
                }
            }
        }).as('currentUser')

        cy.visit('/auth/sign-up')
        cy.get('input[type="email"]').type('admin@gmail.com')
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="password-confirmation"]').type('password')
        cy.get('form').submit()

        cy.wait(['@signUp', '@currentUser'])

        cy.get('.email').should('contain', 'ololo@gmail.com', { timeout: 10000 })
    })
})
