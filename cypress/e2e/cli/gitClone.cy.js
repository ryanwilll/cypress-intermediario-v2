import { faker } from '@faker-js/faker'

describe('Git Clone', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    initialize_with_readme: true,
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.api_createProject(project)
  })

  it('sucessfully', () => {
    cy.cloneThroughSSH(project)

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('exist')
      .should('contain', `# ${project.name}`)
      .and('contain', project.description)
  })
})
