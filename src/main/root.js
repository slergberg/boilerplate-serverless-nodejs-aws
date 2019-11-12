const { jsonResponse } = require('../../helpers/http')

const packageDefinition = require('../../package.json')

async function handler() {
  const response = {
    name: packageDefinition.name,
    version: packageDefinition.version,
  }

  return jsonResponse(response)
}

module.exports = {
  handler,
}
