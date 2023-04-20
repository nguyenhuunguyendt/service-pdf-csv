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
          message: message.error,
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
        return res.status(403).json({
          message: 'duplicate_login',
        })
      }

      // check user lock
      if (accessTokenInDb.is_locked === 1) {
        return res.status(403).json({
          message: message.account_locked,
        })
      }
      next()
    })
  } catch (error) {
    console.log(error)
    return res.status(403).json({
      message: message.error,
    })
  }
}

module.exports={
  verifyToken,
}
