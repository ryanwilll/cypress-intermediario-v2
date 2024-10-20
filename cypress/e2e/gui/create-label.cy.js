import { faker } from '@faker-js/faker'

describe('Create a label for the issue', () => {
  const data = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    },
    label: {
      name: `label-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
      color: faker.color.rgb(),
    },
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(data)
    cy.visit(`${Cypress.env('user_name')}/${data.project.name}`)
    cy.get('.shortcuts-issues').trigger('mouseenter')
    cy.get('.qa-labels-link').click()
    cy.url().should('include', '/labels')
  })

  it('successfully', () => {
    cy.gui_createLabel(data)

    cy.contains(`span`, data.label.name)
      .should('be.visible')
      .should('have.attr', 'style')
      .and('contain', `background-color: ${data.label.color}`)
    cy.get(`.description-text`).should('be.visible')
  })
})
