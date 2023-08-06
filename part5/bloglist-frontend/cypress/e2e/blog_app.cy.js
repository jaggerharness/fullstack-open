describe('Blog application', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'jagger',
      username: 'jagger.dev',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:5173');
  });

  it('front end can be accessed', () => {
    cy.contains('Blog');
  });

  it('login button is shown', () => {
    cy.contains('Login To Create New Blog');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Login To Create New Blog').click();
      cy.get('#username').type('jagger.dev');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();

      cy.contains('You are logged in as jagger');
    });

    it('fails with incorrect credentials', () => {
      cy.contains('Login To Create New Blog').click();
      cy.get('#username').type('wrongUsername');
      cy.get('#password').type('wrongPassword');
      cy.get('#loginBtn').click();

      cy.contains('Username or password incorrect').should(
        'have.class',
        'error'
      );
    });
  });

  describe('When logged in', () => {
    it('A blog can be created', () => {
      cy.contains('Login To Create New Blog').click();
      cy.get('#username').type('jagger.dev');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();

      cy.contains('You are logged in as jagger');

      cy.contains('Create New Blog').click();
      cy.get('#title').type('New Title');
      cy.get('#author').type('New Author');
      cy.get('#url').type('New URL');
      cy.get('#submitBtn').click();

      cy.contains('added successfully').should('have.class', 'success');
      cy.contains('New Title by New Author');
    });

    it('A user can like a blog after created', () => {
      cy.contains('Login To Create New Blog').click();
      cy.get('#username').type('jagger.dev');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();

      cy.contains('You are logged in as jagger');

      cy.contains('Create New Blog').click();
      cy.get('#title').type('New Title');
      cy.get('#author').type('New Author');
      cy.get('#url').type('New URL');
      cy.get('#submitBtn').click();

      cy.contains('added successfully').should('have.class', 'success');
      cy.contains('New Title by New Author');

      cy.contains('Show Details').click();
      cy.contains('Like').click();
      cy.contains('Likes: 1');
    });

    it('A user can delete a blog they created', () => {
      cy.contains('Login To Create New Blog').click();
      cy.get('#username').type('jagger.dev');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();

      cy.contains('You are logged in as jagger');

      cy.contains('Create New Blog').click();
      cy.get('#title').type('New Title');
      cy.get('#author').type('New Author');
      cy.get('#url').type('New URL');
      cy.get('#submitBtn').click();

      cy.contains('added successfully').should('have.class', 'success');
      cy.contains('New Title by New Author');

      cy.contains('Show Details').click();
      cy.contains('Delete').click();
      cy.contains('deleted').should('have.class', 'success');
      cy.contains('New Title by New Author').should('not.exist');
    });

    it('Only the user who created the blog can see the delete button', () => {
      cy.contains('Login To Create New Blog').click();
      cy.get('#username').type('jagger.dev');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();

      cy.contains('You are logged in as jagger');

      cy.contains('Create New Blog').click();
      cy.get('#title').type('New Title');
      cy.get('#author').type('New Author');
      cy.get('#url').type('New URL');
      cy.get('#submitBtn').click();

      cy.contains('added successfully').should('have.class', 'success');
      cy.contains('New Title by New Author');

      cy.contains('Show Details').click();
      cy.contains('Delete');
      cy.contains('Hide Details').click();

      // log out and switch user
      cy.contains('Logout').click();

      const diffUser = {
        name: 'other',
        username: 'other.dev',
        password: 'password',
      };
      cy.request('POST', 'http://localhost:3001/api/users/', diffUser);

      cy.contains('Login To Create New Blog').click();
      cy.get('#username').type('other.dev');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();

      cy.contains('New Title by New Author');
      cy.contains('Show Details').click();
      cy.contains('Delete').should('be.not.visible');
    });

    it('Blogs are ordered by most likes', () => {
      cy.contains('Login To Create New Blog').click();
      cy.get('#username').type('jagger.dev');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();

      cy.contains('You are logged in as jagger');

      cy.contains('Create New Blog').click();
      cy.get('#title').type('Unpopular Title');
      cy.get('#author').type('Unpopular Author');
      cy.get('#url').type('Unpopular URL');
      cy.get('#submitBtn').click();

      cy.contains('added successfully').should('have.class', 'success');
      cy.contains('Unpopular Title by Unpopular Author');
      cy.contains('Show Details').click();
      cy.contains('Like').click();
      cy.contains('liked').should('have.class', 'success');

      cy.contains('Create New Blog').click();
      cy.get('#title').type('Popular Title');
      cy.get('#author').type('Popular Author');
      cy.get('#url').type('Popular URL');
      cy.get('#submitBtn').click();

      cy.contains('added successfully').should('have.class', 'success');
      cy.contains('Popular Title by Popular Author')
        .contains('Show Details')
        .click();
      cy.contains('Popular Title by Popular Author').contains('Like').click();
      cy.contains('liked').should('have.class', 'success');
      cy.contains('Popular Title by Popular Author').contains('Like').click();
      cy.contains('liked').should('have.class', 'success');
      cy.contains('Popular Title by Popular Author').contains('Like').click();
      cy.contains('liked').should('have.class', 'success');
      cy.contains('Popular Title by Popular Author').contains('Like').click();
      cy.contains('liked').should('have.class', 'success');
      cy.reload();

      // Check order
      cy.get('.blog').eq(0).should('contain', 'Popular Title by Popular Author')
      cy.get('.blog').eq(1).should('contain', 'Unpopular Title by Unpopular Author')
    });
  });
});
