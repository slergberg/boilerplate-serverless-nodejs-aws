const { formatResponse } = require('../../helpers/http')

const packageDefinition = require('../../package.json')

const handler = (event, context, callback) => {
  const response = {
    version: packageDefinition.version,
  }

  callback(null, formatResponse(response))
}

module.exports = { handler }
