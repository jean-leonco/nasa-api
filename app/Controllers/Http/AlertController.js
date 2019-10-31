'use strict'

const Alert = use('App/Models/Alert')
const Issue = use('App/Models/Issue')
const checkCep = require('../../Util/checkCep')

class AlertController {
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

      const { message, region } = await checkCep(cep)

      if (message) {
        return response.status(400).send({
          error: {
            message
          }
        })
      }

      const alert = await Alert.create({
        issue_id,
        description,
        region
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

      if (issue_id !== alert.issue_id) {
        await Issue.findOrFail(issue_id)
      }

      const { message, region } = await checkCep(cep)

      if (message) {
        return response.status(400).send({
          error: {
            message
          }
        })
      }

      alert.merge({ issue_id, description, region })

      await alert.save()

      return alert
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: error.message.includes('Alert')
            ? 'Alguma coisa deu errado, não pudemos encontrar o alerta'
            : 'Alguma coisa deu errado, não pudemos encontrar o problema'
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

module.exports = AlertController
