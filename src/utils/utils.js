const { message, code } = require('../constant')
const jwt = require('jsonwebtoken')

function getUserIdByToken(req) {
  const Authorization = req.headers.Authorization || req.headers.authorization
  if (Authorization && Authorization.split(' ').length > 1) {
    try {
      return jwt.verify(Authorization.split(' ')[1], process.env.JWT_SECRET).user_id
    } catch (error) {
      console.error(error)
    }
  }

  const error = new Error(message.access_token_invalid)
  error.code = code.AUTHORIZATION
  throw error
}

const createResponse = (res, isSuccess = true, data = {}, code, message) => {
  const response = {}

  if (isSuccess) {
    response['status'] = 'success'
    response['data'] = data
  } else if (message) {
    response['status'] = 'error'
    response['message'] = message
    if (code) response['code'] = code
    if (data) response['data'] = data
  } else {
    response['status'] = 'fail'
    response['data'] = data
  }

  const statusCode = isSuccess ? 200 : 500

  return res.status(statusCode)
    .set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    })
    .json(response)
}


module.exports = {
  getUserIdByToken,
  createResponse,
}
