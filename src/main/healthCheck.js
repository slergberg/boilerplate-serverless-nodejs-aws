const { jsonResponse } = require('../../helpers/http')

async function handler() {
  return jsonResponse(null, 200)
}

module.exports = {
  handler,
}
