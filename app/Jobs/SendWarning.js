'use strict'

const whatsApi = require('../../config/whatsApi')

class SendWarning {
  static get concurrency () {
    return 4
  }

  static get key () {
    return 'SendWarning-job'
  }

  async handle ({ description, location }) {
    await whatsApi.post('messages', {
      number: 554197951157,
      serviceId: process.env.SERVICE_ID,
      text: `${description} está ocorrendo em ${location}`
    })
  }
}

module.exports = SendWarning
