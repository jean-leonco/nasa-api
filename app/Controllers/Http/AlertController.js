'use strict'

const Alert = use('App/Models/Alert')
const Issue = use('App/Models/Issue')
const cepApi = require('../../../config/cepApi')

class IssueController {
  async index ({ request }) {
    const { page } = request.get()

    const alerts = await Alert.query()
      .with('issue')
      .paginate(page)

    return alerts
  }

  async store ({ request, response }) {
    try {
      const { issue_id, description, cep } = request.all()

      await Issue.findOrFail(issue_id)

      const { error, data } = await cepApi.get(`/${cep}/json`)

      if (error) {
        return response.status(400).send({
          error: {
            message: 'Alguma coisa deu errado, não pudemos encontrar o endereço'
          }
        })
      }

      const { localidade, bairro } = data

      if (localidade.toLowerCase() !== 'curitiba') {
        return response.status(400).send({
          error: {
            message: 'O serviço só está funcionando em Curitiba'
          }
        })
      }

      const alert = await Alert.create({
        issue_id,
        description,
        region: bairro
      })

      return alert
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o problema'
        }
      })
    }
  }

  async show ({ params, response }) {
    try {
      const alert = await Alert.findOrFail(params.id)

      await alert.load('issue')

      return alert
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o alerta'
        }
      })
    }
  }

  async update ({ request, params, response }) {
    try {
      const alert = await Alert.findOrFail(params.id)

      const { issue_id, description, cep } = request.all()

      const { error, data } = await cepApi.get(`/${cep}/json`)

      if (error) {
        return response.status(400).send({
          error: {
            message: 'Alguma coisa deu errado, não pudemos encontrar o endereço'
          }
        })
      }

      const { localidade, bairro } = data

      if (localidade.toLowerCase() !== 'curitiba') {
        return response.status(400).send({
          error: {
            message: 'O serviço só está funcionando em Curitiba'
          }
        })
      }

      alert.merge({ issue_id, description, region: bairro })

      await alert.save()

      return alert
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o alerta'
        }
      })
    }
  }

  async destroy ({ params, response }) {
    try {
      const alert = await Alert.findOrFail(params.id)

      alert.delete()

      return response.send({
        sucess: { message: 'Alerta foi deletado' }
      })
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o alerta'
        }
      })
    }
  }
}

module.exports = IssueController
