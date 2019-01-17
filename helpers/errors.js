const debug = require('debug')('api')

const ApiError = require('./errors/ApiError')

const logError = (err) => {
  if (err instanceof ApiError) {
    return
  }

  debug(err)
}

module.exports = {
  ApiError,
  logError,
}
