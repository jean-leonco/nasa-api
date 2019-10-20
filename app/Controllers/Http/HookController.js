'use strict'

const whatsApi = require('../../../config/axios')
class HookController {
  async store ({ request }) {
    const data = request.input(['data'])

    const { isFromMe, text, data: dataNumber } = data

    const { number } = dataNumber

    if (isFromMe || !text || !number) return

    await whatsApi.post('messages', {
      number,
      serviceId: process.env.SERVICE_ID,
      text
    })
  }
}

module.exports = HookController
