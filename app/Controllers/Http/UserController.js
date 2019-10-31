'use strict'

const User = use('App/Models/User')
const checkCep = require('../../Util/checkCep')

class UserController {
  async index ({ request, response }) {
    const { page } = request.get()

    const users = await User.query().paginate(page)

    return users
  }

  async show ({ request, params, response }) {
    try {
      const user = await User.findOrFail(params.id)

      return user
    } catch (error) {
      return response.status(error.status).send({
        error: 'Alguma coisa deu errado, não pudemos encontrar o usuário'
      })
    }
  }

  async store ({ request, response }) {
    const { name, number, cep } = request.only(['name', 'number', 'cep'])

    const { message, region, full_address } = await checkCep(cep)

    if (message) {
      return response.status(400).send({
        error: message
      })
    }

    const data = { name, number, cep, region, full_address }

    const user = await User.create(data)

    return user
  }

  async update ({ request, params, response }) {
    try {
      const user = await User.findOrFail(params.id)

      const data = request.only(['name', 'number', 'cep'])

      if (data.number !== user.number) {
        const isUser = await User.findBy('number', data.number)

        if (isUser) {
          return response.status(401).send({
            error: 'O número já está associado com outra pessoa'
          })
        }
      }

      if (data.cep !== user.cep) {
        const { message, region, full_address } = await checkCep(data.cep)

        if (message) {
          return response.status(400).send({
            error: message
          })
        }

        data.region = region
        data.full_address = full_address
      }

      user.merge(data)

      await user.save()

      return user
    } catch (error) {
      return response.status(error.status).send({
        error: 'Alguma coisa deu errado, não pudemos encontrar o usuário'
      })
    }
  }

  async destroy ({ params, response }) {
    try {
      const user = await User.findOrFail(params.id)

      await user.delete()

      return response.send({
        sucess: { message: 'Usuário foi deletado' }
      })
    } catch (error) {
      return response.status(error.status).send({
        error: 'Alguma coisa deu errado, não pudemos encontrar o usuário'
      })
    }
  }
}

module.exports = UserController
