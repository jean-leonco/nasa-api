'use strict'

const Alert = use('App/Models/Alert')

class IssueController {
  async index ({ request }) {
    const { page } = request.get()

    const alerts = await Alert.query()
      .with('issue')
      .paginate(page)

    return alerts
  }

  async store ({ request }) {
    const data = request.all()

    const alert = await Alert.create(data)

    return alert
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

      const data = request.only(['description', 'location'])

      alert.merge(data)

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
