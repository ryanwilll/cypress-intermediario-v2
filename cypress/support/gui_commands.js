Cypress.Commands.add(
  'login',
  (user = Cypress.env('user_name'), password = Cypress.env('user_password'), { cacheSession = true } = {}) => {
    const login = () => {
      cy.visit('/users/sign_in')
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, {
        log: false,
      })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = () => {
      cy.visit('/')
      cy.location('pathname').should('not.eq', '/users/sign_in')
    }

    const options = {
      cacheAcrossSpecs: true, // Permite restaurar a session em outros specs
      validate,
    }

    if (cacheSession) {
      cy.session(user, login, options)
    } else {
      login()
    }
  }
)

Cypress.Commands.add('logout', () => {
  const logout = () => {
    cy.get('[data-qa-selector="user_menu"]').should('be.visible').click()
    cy.get('[data-qa-selector="sign_out_link"]').should('be.visible').click()
  }

  logout()
})

Cypress.Commands.add('gui_createProject', (project) => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', (issue) => {
  cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('.qa-issuable-form-description').type(issue.description)
  cy.contains('Submit issue').click()
})
