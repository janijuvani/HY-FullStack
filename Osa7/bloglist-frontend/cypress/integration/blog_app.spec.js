describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('log in').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('cancel')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('väärä')
      cy.get('#password').type('väärä2')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      //cy.contains('log in').click()
      //cy.get('#username').type('mluukkai')
      //cy.get('#password').type('salainen')
      //cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('title created by cypress')
      cy.get('#author').type('author created by cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('a new blog title created by cypress by author created by cypress added')
      cy.contains('title created by cypress author created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'title created by cypress',
          author: 'author created by cypress',
          url: 'www.cypress.com'
        })
      })

      it('blog can be liked', function () {
        cy.contains('title created by cypress author created by cypress')
          .contains('view')
          .click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('blog can be deleted', function () {
        cy.contains('title created by cypress author created by cypress')
          .contains('view')
          .click()
        cy.contains('Remove').click()
        cy.get('html').should('not.contain', 'title created by cypress author created by cypress')
      })
    })
  })
})