import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
  let issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    },
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.api_createProject(issue.project)
    cy.login()
  })

  it('successfully', () => {
    cy.gui_createIssue(issue)
    cy.get('.issue-details').should('contain', issue.title).and('contain', issue.description)
  })
})
