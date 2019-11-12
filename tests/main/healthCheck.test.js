const { handler: healthCheckHandler } = require('../../src/main/healthCheck')
const { jsonResponse } = require('../../helpers/http')

describe('health check handler', () => {
  test('basic request', async () => {
    const expectedResponse = null

    const response = await healthCheckHandler(null, null)

    expect(response).toMatchObject(jsonResponse(expectedResponse))
  })
})
