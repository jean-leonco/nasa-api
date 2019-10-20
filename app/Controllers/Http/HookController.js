'use strict'

const whatsApi = require('../../../config/axios')
class HookController {
  async store ({ request }) {
    const data = request.input(['data'])

    const { isFromMe, text } = data

    if (isFromMe || !text) return

    await whatsApi.post('messages', {
      number: 554188231899,
      serviceId: process.env.SERVICE_ID,
      text: 'eai irmão'
    })
  }
}

module.exports = HookController
