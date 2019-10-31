'use strict'

const Issue = use('App/Models/Issue')

class IssueController {
  async index ({ request, response }) {
    const { page } = request.get()

    const issues = await Issue.query().paginate(page)

    return issues
  }

  async show ({ request, params, response }) {
    try {
      const issue = await Issue.findOrFail(params.id)

      return issue
    } catch (error) {
      return response.status(error.status).send({
        error: 'Alguma coisa deu errado, não pudemos encontrar o problema'
      })
    }
  }

  async store ({ request }) {
    try {
      const data = request.only(['name', 'description'])

      const issue = await Issue.create(data)

      return issue
    } catch (error) {
      console.log(error)
    }
  }

  async update ({ request, params, response }) {
    try {
      const data = request.only(['name', 'description'])

      const issue = await Issue.findOrFail(params.id)

      issue.merge(data)

      await issue.save()

      return issue
    } catch (error) {
      return response.status(error.status).send({
        error: 'Alguma coisa deu errado, não pudemos encontrar o problema'
      })
    }
  }

  async destroy ({ params, response }) {
    try {
      const issue = await Issue.findOrFail(params.id)

      await issue.delete()

      return response.send({
        sucess: { message: 'Problema foi deletado' }
      })
    } catch (error) {
      return response.status(error.status).send({
        error: 'Alguma coisa deu errado, não pudemos encontrar o problema'
      })
    }
  }
}

module.exports = IssueController
