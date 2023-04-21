const { message, code } = require('../constant/common')

function errorHandler(err, req, res, next) {
  console.log(err)
  return res.status(500).json({
    message: message.server_error,
    code: code.ERROR,
    status: 'error',
  })
}

module.exports = {
  errorHandler,
}
