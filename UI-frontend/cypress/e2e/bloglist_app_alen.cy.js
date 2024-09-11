/* eslint-disable */
describe('Blog posting app', () => {

  const baseUrl = 'http://localhost:3000'

  it('Front page is rendered and contains a blog', function()  {
    cy.visit(`${baseUrl}`)
    cy.wait(2000)
    cy.visit(`${baseUrl}/api/blogs`)
    cy.contains('Random Blog 1')
  })

  it('We can attempt to login', function() {
    cy.visit(`${baseUrl}`)
    cy.wait(2000)
    cy.visit(`${baseUrl}/api/login`)
    cy.contains('Sign In').click()
  })

  it('User can login successfully', function() {
    cy.visit(`${baseUrl}`)
    cy.wait(2000)
    cy.visit(`${baseUrl}/api/login`)
    cy.contains('Sign In').click()
    cy.get('#username-input').type('testingusername1')
    cy.get('#password-input').type('Testingpassword1#########')
    cy.contains('Sign In').click()

    cy.contains('Logged in as testingname1')
  })

  it('Login fails with the wrong password provided', function() {
    cy.visit(`${baseUrl}`)
    cy.wait(2000)
    cy.visit(`${baseUrl}/api/login`)
    cy.contains('button', 'Sign In').click();
    cy.get('#username-input').type('testingusername1')
    cy.get('#password-input').type('wrongpassword')
    cy.contains('Sign In').click()

    cy.contains('Login failed. Verify login details')
    cy.get('html').should('not.contain', 'testingname1 is logged in')
  })
  
 it('Sign-up fails with incorrectly formatted password', function() {
  cy.visit(`${baseUrl}`)
  cy.wait(2000)
  cy.visit(`${baseUrl}/api/register`)
  cy.get('#signupUsername').type('Testingname1')
  cy.get('#signUpname').type('Nametest1')
  cy.get('#signUp-password').type('Hgggggggggggggg111')
  cy.get('#repeatPassword').type('Hgggggggggggggg111')

  cy.contains('Sign Up').click()

  cy.contains('An error occured while registering your account.')
})

it('We cannot visit the login page if we are already logged in, and will be redirected back onto the home page', function() {
cy.visit(`${baseUrl}`)
cy.wait(2000)
cy.visit(`${baseUrl}/api/login`)
cy.contains('Sign In').click()
cy.get('#username-input').type('testingusername1')
cy.get('#password-input').type('Testingpassword1#########')
cy.contains('Sign In').click()

cy.contains('Logged in as testingname1')

cy.visit(`${baseUrl}/api/login`)
cy.contains('Welcome to SnapBlog, a blog sharing site!')
})

it('We can visit the users list and view individual user profiles', function() {
cy.visit(`${baseUrl}`)
cy.wait(2000)
cy.visit(`${baseUrl}/api/users`)
cy.contains('testingname1').click()
cy.contains('Total likes: 776')
})

it('A logged in user can like a blog post', function() {
cy.visit(`${baseUrl}`)
cy.wait(2000)
cy.visit(`${baseUrl}/api/login`)
cy.contains('Sign In').click()
cy.get('#username-input').type('testingusername1')
cy.get('#password-input').type('Testingpassword1#########')
cy.contains('Sign In').click()

cy.contains('Logged in as testingname1')

cy.visit(`${baseUrl}/api/blogs`)
cy.get('.css-en09l0').click({ multiple: true })
cy.contains('56')
})

it('A logged in user can visit an individual blog post page, and leave a comment on it.', function() {
cy.visit(`${baseUrl}`)
cy.wait(2000)
cy.visit(`${baseUrl}`)
cy.visit(`${baseUrl}/api/login`)
cy.contains('Sign In').click()
cy.get('#username-input').type('testingusername1')
cy.get('#password-input').type('Testingpassword1#########')
cy.contains('Sign In').click()

cy.contains('Logged in as testingname1')

cy.visit(`${baseUrl}/api/blogs`)

cy.contains('View Post').click()
cy.contains('Viewing individual blog post')
cy.get('#\\:r1\\:').type('New comment from end-to-end testing!') // :r1: is id of the textarea element

cy.contains('Send').click()
cy.wait(1500)

cy.contains('New comment from end-to-end testing!')
})

})