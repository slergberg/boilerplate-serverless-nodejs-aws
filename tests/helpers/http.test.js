const qs = require('qs')

const { ApiError } = require('../../helpers/errors')
const {
  formatErrorResponse,
  formatResponse,
  parseRequest,
} = require('../../helpers/http')

test('Format basic error response', () => {
  const errorResponse = formatErrorResponse({ message: 'basic-error-message' })

  expect(errorResponse).toEqual({
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: 'basic-error-message',
  })
})

test('Format basic error response with custom code', () => {
  const errorResponse = formatErrorResponse(
    { message: 'basic-error-message-with-custom-code' },
    500,
  )

  expect(errorResponse).toEqual({
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: 'basic-error-message-with-custom-code',
  })
})

test('Format custom error response', () => {
  const errorMessage = 'custom-error-message'

  const errorResponse = formatErrorResponse(
    new ApiError(errorMessage, { statusCode: 500 }),
  )

  expect(errorResponse).toEqual({
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ code: errorMessage }),
  })
})

test('Format basic response', () => {
  const responseData = { testContent: 'basic-response-message' }

  const errorResponse = formatResponse(responseData)

  expect(errorResponse).toEqual({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(responseData),
  })
})

test('Format basic response with custom code', () => {
  const responseData = {
    testContent: 'basic-response-message-with-custom-code',
  }

  const errorResponse = formatResponse(responseData, 201)

  expect(errorResponse).toEqual({
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(responseData),
  })
})

test('Parse basic request', () => {
  const basicRequest = {
    body: qs.stringify({ testContent: 'basic-request-test' }),
  }

  const parsedRequest = parseRequest(basicRequest)

  expect(parsedRequest.body.testContent).toBe('basic-request-test')
})
