'use strict'

class HookController {
  async store ({ request }) {
    const data = request.input(['data'])

    const { isFromMe, text } = data

    if (isFromMe || !text) return

    return { message: 'Em que posso ajudar' }
  }
}

module.exports = HookController
