'use strict'

const User = use('App/Models/User')
const cepApi = require('../../../config/cepApi')

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
    const { name, number, cep } = request.only(['name', 'number', 'cep'])

    const user = new User()
    user.name = name
    user.number = number
    user.cep = cep

    const { error, data } = await cepApi.get(`/${cep}/json`)

    if (error) {
      return response.status(400).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o endereço'
        }
      })
    }

    const { localidade, bairro, logradouro } = data

    if (localidade.toLowerCase() !== 'curitiba') {
      return response.status(400).send({
        error: {
          message: 'O serviço só está funcionando em Curitiba'
        }
      })
    }

    user.region = bairro
    user.full_address = logradouro

    await user.save()

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
            error: {
              message: 'O número já está associado com outra pessoa'
            }
          })
        }
      }

      if (data.cep !== user.cep) {
        const { error, data: cepData } = await cepApi.get(`/${data.cep}/json`)

        if (error) {
          return response.status(400).send({
            error: {
              message:
                'Alguma coisa deu errado, não pudemos encontrar o endereço'
            }
          })
        }

        const { localidade, bairro, logradouro } = cepData

        if (localidade.toLowerCase() !== 'curitiba') {
          return response.status(400).send({
            error: {
              message: 'O serviço só está funcionando em Curitiba'
            }
          })
        }

        data.region = bairro
        data.full_address = logradouro
      }

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

  async destroy ({ params, response }) {
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
