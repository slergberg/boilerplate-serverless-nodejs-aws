const qs = require('qs')

const { ApiError } = require('./errors')

const formatErrorResponse = (error, code = 400) => {
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(error.details),
    }
  }

  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: error.message,
  }
}

const formatResponse = (data, code = 200) => ({
  statusCode: code,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(data),
})

const parseRequest = (event) => ({
  ...event,
  body: qs.parse(event.body),
})

module.exports = {
  formatErrorResponse,
  formatResponse,
  parseRequest,
}
