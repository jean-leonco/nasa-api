'use strict'

const User = use('App/Models/User')

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
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o usuário'
        }
      })
    }
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'number', 'address'])

    const user = await User.create(data)

    return user
  }

  async update ({ request, params, response }) {
    try {
      const user = await User.findOrFail(params.id)

      const data = request.only(['name', 'number', 'address'])

      user.merge(data)

      await user.save()

      return user
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o usuário'
        }
      })
    }
  }

  async destroy ({ request, params, response }) {
    try {
      const user = await User.findOrFail(params.id)

      await user.delete()

      return response.send({
        sucess: { message: 'Usuário foi deletado' }
      })
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o usuário'
        }
      })
    }
  }
}

module.exports = UserController
