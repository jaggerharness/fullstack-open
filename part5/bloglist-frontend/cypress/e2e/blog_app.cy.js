describe('Blog application', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:5173');
  });
  it('front end can be accessed', () => {
    cy.contains('Blogs');
  });
});
