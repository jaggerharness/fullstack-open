describe('Blog application', () => {
  it('front end can be accessed', () => {
    cy.visit('https://localhost:5173');
    cy.contains('Blogs');
  });
});
