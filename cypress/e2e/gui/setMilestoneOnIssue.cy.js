import { faker } from '@faker-js/faker'

describe('set Milestone on issue', () => {
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
    milestone: {
      title: `Sprint ${faker.random.numeric(3)}`,
      description: `${faker.random.words(5)}`,
    },
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(data).then((res) => {
      cy.api_createMilestone(res.body.project_id, data.milestone)
      cy.visit(`${Cypress.env('user_name')}/${data.project.name}/issues/${res.body.iid}`)
    })
  })

  it('successfully', () => {
    cy.gui_setMilestoneOnIssue(data.milestone)
    cy.get('.block.milestone').should('contain', data.milestone.title)
  })
})
