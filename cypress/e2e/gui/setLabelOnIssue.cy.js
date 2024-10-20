import { faker } from '@faker-js/faker'

describe('Set label on issue', () => {
  const data = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    },
    label: {
      name: `label-${faker.datatype.uuid()}`,
      color: faker.color.rgb(),
    },
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(data).then((res) => {
      cy.api_createLabel(res.body.project_id, data.label)
      cy.visit(`${Cypress.env('user_name')}/${data.project.name}/issues/${res.body.iid}`)
    })
  })

  it('successfully', () => {
    cy.gui_setLabelOnIssue(data.label)

    cy.get('.qa-labels-block').should('contain', data.label.name)
    cy.contains('span', data.label.name)
      .should('have.attr', 'style')
      .and('contain', `background-color: ${data.label.color}`)
  })
})
