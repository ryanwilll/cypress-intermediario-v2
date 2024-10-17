describe('Create Project', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('successfully', (projectName = 'project-created-automatically') => {
    cy.get('#js-onboarding-new-project-link').should('be.visible').click();
    cy.get('.qa-global-new-project-link').should('be.visible').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/projects/new`);
    cy.get('#project_name')
      .should('be.visible')
      .type(`${projectName}`)
      .should('have.value', `${projectName}`);
    cy.contains('input', 'Create project').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/root/${projectName}`);
  });
});
