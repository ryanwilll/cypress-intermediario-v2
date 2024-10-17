describe('Logout', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('successfully', () => {
    cy.logout();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/users/sign_in`);
  });
});
