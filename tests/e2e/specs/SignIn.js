import { createVerify } from "crypto";

// https://docs.cypress.io/api/introduction/api.html

describe('Testing Sign in flow', () => {

    it('Redirect to sign-in when touches root url', () => {
        cy.visit('/')
        cy.location('pathname').should('eq', '/auth/sign-in')
    })

    it('Moves to sign-up page when clicks on sigh-up link', () => {
        cy.visit('/')
        cy.get('.auth.navigation.tabs li:nth-child(2) > a').click()
        cy.location('pathname').should('eq', '/auth/sign-up')
    })

    it('Checks failed validation for the wrong email', () => {
        cy.visit('/sign-in')
        cy.get('input[type="email"]').type('admin')
        cy.get('form ul > li:first').should('contain', 'Does not match the email')
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
        }).as('signIn')
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

        cy.visit('/sign-in')
        cy.get('input[type="email"]').type('admin@gmail.com')
        cy.get('input[type="password"]').type('password')
        cy.get('form').submit()

        cy.wait([ '@signIn', '@currentUser' ])

        cy.get('.email').should('contain', 'ololo@gmail.com', { timeout: 10000 })
    })
})
