'use strict'

class Issue {
  get rules () {
    return {
      issue_id: 'required',
      description: 'required',
      location: 'required'
    }
  }

  get messages () {
    return {
      'issue_id.required': 'É preciso informar o problema relacionado',
      'description.required': 'É preciso informar uma descrição',
      'location.required': 'É preciso informar uma localização'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = Issue
