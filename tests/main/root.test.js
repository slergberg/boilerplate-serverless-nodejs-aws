const packageDefinition = require('../../package.json')
const { formatResponse } = require('../../helpers/http')
const { handler: rootHandler } = require('../../src/main/root')

test('Version from package.json', () => {
  const expectedResponse = {
    name: packageDefinition.name,
    version: packageDefinition.version,
  }

  const callback = jest.fn().mockImplementation((err, data) => data)

  rootHandler(null, null, callback)

  expect(callback).toBeCalledWith(null, formatResponse(expectedResponse))
})
