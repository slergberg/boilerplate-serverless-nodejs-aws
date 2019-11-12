const { handler: rootHandler } = require('../../src/main/root')
const { jsonResponse } = require('../../helpers/http')

const packageDefinition = require('../../package.json')

describe('root handler', () => {
  test('basic request', async () => {
    const expectedResponse = {
      name: packageDefinition.name,
      version: packageDefinition.version,
    }

    const response = await rootHandler(null, null)

    expect(response).toMatchObject(jsonResponse(expectedResponse))
  })
})
