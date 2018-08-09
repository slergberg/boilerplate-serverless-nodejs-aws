const { formatResponse } = require('../../helpers/http')

const handler = (event, context, callback) => {
  const response = {
    status: 200,
  }

  callback(null, formatResponse(response))
}

module.exports = { handler }
