const jwt = require('jsonwebtoken')
const { message } = require('../constant')
const { getTokenbyId } = require('../repository')
async function verifyToken(req, res, next) {
  try {
    const authorizationToken = req.headers.authorization || req.headers.Authorization || ''
    const jwtToken = authorizationToken ? authorizationToken.split(' ')[1] : ''

    await jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const accessTokenInDb = await getTokenbyId(decode.user_id)
      if (!accessTokenInDb) {
        return res.status(403).json({
          message: message.server_error,
        })
      }

      // check verify accesstoken in Db
      let validToken = false

      if (!decode.is_admin) {
        validToken = await jwt.verify(accessTokenInDb.access_token, process.env.JWT_SECRET, async (err) => {
          if (err) {
            return false
          } else {
            return true
          }
        })
      }

      // check duplicate login
      if ( validToken && jwtToken !== accessTokenInDb.access_token) {
        return res.status(403)
          .set('error-message', 'duplicate_login')
          .json({ 'message': 'User is not authorized to access this resource with an explicit deny' })
      }

      // check user lock
      if (accessTokenInDb.is_locked === 1) {
        return res.status(403)
          .set('error-message', message.account_locked)
          .json({ 'message': 'User is not authorized to access this resource with an explicit deny' })
      }
      next()
    })
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
}

module.exports = {
  verifyToken,
}
