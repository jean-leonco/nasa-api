'use strict'

const Issue = use('App/Models/Issue')

class IssueController {
  async store ({ request, response }) {
    try {
      const data = request.only(['name', 'description'])

      const issue = await Issue.create(data)

      return issue
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = IssueController
