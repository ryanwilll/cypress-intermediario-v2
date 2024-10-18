import { faker } from '@faker-js/faker'

describe('Create Project', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
  })

  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
      initialize_with_readme: faker.datatype.boolean(),
    }

    cy.api_createProject(project).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq(project.name)
      expect(response.body.description).to.eq(project.description)
    })
  })
})
