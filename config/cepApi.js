const axios = require('axios')

const cepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})

module.exports = cepApi
