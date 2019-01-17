const { formatResponse } = require('../../helpers/http')
const { handler: healthCheckHandler } = require('../../src/main/healthCheck')

test('Version from package.json', () => {
  const expectedResponse = {
    status: 200,
  }

  const callback = jest.fn().mockImplementation((err, data) => data)

  healthCheckHandler(null, null, callback)

  expect(callback).toBeCalledWith(null, formatResponse(expectedResponse))
})
