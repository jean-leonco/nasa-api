'use strict'

class Issue {
  get rules () {
    return {
      issue_id: 'required',
      description: 'required',
      cep: 'required|integer|min:8'
    }
  }

  get messages () {
    return {
      'issue_id.required': 'É preciso informar o problema relacionado',
      'description.required': 'É preciso informar uma descrição',
      'cep.required': 'É preciso informar o CEP',
      'cep.integer': 'O CEP só pode conter números',
      'cep.min': 'O CEP precisa ser composto por 8 dígitos'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = Issue
