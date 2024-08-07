/* eslint-disable */
describe('Blog posting app', () => {

  const baseUrl = 'http://localhost:3003'

  it('Front page is rendered and contains a blog', function()  {
    cy.visit(`${baseUrl}/api/blogs`)
    cy.contains('Random Blog 1')
  })

  it('We can attempt to login', function() {
    cy.visit(`${baseUrl}/api/login`)
    cy.contains('Sign in').click()
  })
  // needs to be completed
  it('User can login successfully', function() {
    cy.visit(`${baseUrl}/api/login`)
    cy.contains('Sign in').click()
    cy.get('#username-input').type('testingusername1') // an element with an id of username
    cy.get('#password-input').type('Testingpassword1#########')
    cy.contains('Sign in').click()

    cy.contains('Logged in as testingname1')
  })

  it('Login fails with the wrong password provided', function() {
    cy.visit(`${baseUrl}/api/login`)
    cy.contains('Sign in').click()
    cy.get('#username-input').type('testingusername1')
    cy.get('#password-input').type('wrongpassword')
    cy.contains('Sign in').click()

    cy.contains('Login failed. Verify login details')
    cy.get('html').should('not.contain', 'testingname1 is logged in')
  })
})