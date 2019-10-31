'use strict'

class User {
  get rules () {
    return {
      name: 'required',
      number: 'required|unique:users',
      cep: 'required|integer|min:8'
    }
  }

  get messages () {
    return {
      'name.required': 'É preciso informar o nome do usuário',
      'number.required': 'É preciso informar o número de telefone',
      'number.unique': 'O número já está associado a outra conta',
      'cep.required': 'É preciso informar o CEP',
      'cep.integer': 'O CEP só pode conter números',
      'cep.min': 'O CEP precisa ser composto por 8 dígitos'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = User
