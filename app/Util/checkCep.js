const api = require('../../config/cepApi')

async function checkCep (cep) {
  const { error, data } = await api.get(`/${cep}/json`)

  if (error) {
    return {
      message: 'Alguma coisa deu errado, não pudemos encontrar o endereço'
    }
  }

  const { localidade, bairro, logradouro } = data

  if (localidade.toLowerCase() !== 'curitiba') {
    return {
      message: 'O serviço só está funcionando em Curitiba'
    }
  }

  return {
    region: bairro,
    full_address: logradouro
  }
}

module.exports = checkCep
