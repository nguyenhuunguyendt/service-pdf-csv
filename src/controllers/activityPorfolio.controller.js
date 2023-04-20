const { code, message } =require('../constant')
const { createResponse, getUserIdByToken } = require('../utils')
const { getPortfolioActivities } = require('../repository')

async function ExportActivityPortFolio(req, res, next) {
  try {
    const user_id = getUserIdByToken(req)

    if (!req.query.totalRecord) {
      return createResponse(res, false, null, code.INVALID, message.fields_invalid )
    }

    const portfolio = await getPortfolioActivities(req.params.portfolioId, user_id)

    if (!portfolio) {
      return createResponse(res, false, null, code.ERROR, message.server_error )
    }

    return createResponse(res, true, portfolio)
  } catch (error) {
    console.log(error)
    return createResponse(res, false, null, code.ERROR, message.server_error )
  }
}

module.exports = {
  ExportActivityPortFolio,
}
