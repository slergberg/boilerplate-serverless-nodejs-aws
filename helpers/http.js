const qs = require('qs')

function corsJsonResponse(response) {
  const { headers: responseHeaders = {} } = response

  return {
    ...response,
    headers: {
      ...responseHeaders,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: response.body,
  }
}

function jsonRequest(requestEvent) {
  return {
    body: qs.parse(requestEvent.body),
    event: requestEvent,
  }
}

function jsonResponse(responseBody, statusCode = 200, options = {}) {
  const { cors = true, headers } = options

  const response = {
    body: responseBody ? JSON.stringify(responseBody) : responseBody,
    headers,
    statusCode,
  }

  if (cors) {
    return corsJsonResponse(response)
  }

  return response
}

module.exports = {
  jsonRequest,
  jsonResponse,
}
