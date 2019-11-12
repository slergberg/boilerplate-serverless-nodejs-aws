const qs = require('qs')

const { jsonRequest, jsonResponse } = require('../../helpers/http')

describe('http helpers', () => {
  it('format empty cors response', () => {
    const response = jsonResponse(null)

    expect(response).toMatchObject({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })
  })

  it('format empty non-cors response', () => {
    const response = jsonResponse(null, 200, { cors: false })

    expect(response).not.toMatchObject({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })
  })

  it('format empty response with custom headers', () => {
    const authorizationHeader = 'Bearer AbCdEf123456'

    const response = jsonResponse(null, 200, {
      cors: false,
      headers: { Authorization: authorizationHeader },
    })

    expect(response).not.toMatchObject({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })

    expect(response).toMatchObject({
      headers: {
        Authorization: authorizationHeader,
      },
    })
  })

  it('format basic error response', () => {
    const responseData = 'basic-error-message'

    const response = jsonResponse(responseData, 500)

    expect(response).toMatchObject({
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(responseData),
    })
  })

  it('format basic response', () => {
    const responseData = 'basic-response-message'

    const response = jsonResponse(responseData)

    expect(response).toMatchObject({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(responseData),
    })
  })

  it('format basic response with custom code', () => {
    const responseData = 'basic-response-message-with-custom-code'

    const response = jsonResponse(responseData, 201)

    expect(response).toMatchObject({
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(responseData),
    })
  })

  it('format JSON response', () => {
    const responseData = { testContent: 'basic-response-message' }

    const response = jsonResponse(responseData)

    expect(response).toMatchObject({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(responseData),
    })
  })

  it('parse basic request', () => {
    const requestData = { testContent: 'basic-request-test' }

    const basicRequest = {
      body: qs.stringify(requestData),
    }

    const parsedRequest = jsonRequest(basicRequest)

    expect(parsedRequest.body).toMatchObject(requestData)
  })
})
