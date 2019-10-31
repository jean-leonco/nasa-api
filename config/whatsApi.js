const axios = require('axios')

const whatsApi = axios.create({
  baseURL: 'https://zimobi-api.mandeumzap.com.br/v1'
})

whatsApi.defaults.headers.Authorization = `Bearer ${process.env.WHATSAPP_KEY}`

module.exports = whatsApi
