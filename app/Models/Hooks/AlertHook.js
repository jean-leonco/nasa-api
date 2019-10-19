'use strict'

const whatsApi = require('../../../config/axios')

const IssueHook = (exports = module.exports = {})

IssueHook.sendWarning = async issue => {
  try {
    await whatsApi.post('messages', {
      number: 554197951157,
      serviceId: process.env.SERVICE_ID,
      text: `${issue.description} está ocorrendo em ${issue.location}`
    })
  } catch (error) {
    console.log(error)
  }
}
