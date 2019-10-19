'use strict'

class User {
  get rules () {
    return {
      name: 'required',
      number: 'required|unique:users'
    }
  }

  get messages () {
    return {
      'name.required': 'É preciso informar o nome do usuário',
      'number.required': 'É preciso informar o número de telefone',
      'number.unique': 'O número já está associado a outra conta'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = User
