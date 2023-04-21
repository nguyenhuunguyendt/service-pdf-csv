const { code, message } = require('../constant')
const { createResponse, getUserIdByToken } = require('../utils')
const { getPortfolioActivities } = require('../repository')

async function exportActivityPortFolio(req, res, next) {
  try {
    const user_id = getUserIdByToken(req)
    const { totalRecord, exportsCSV } = req.query
    if (!totalRecord) {
      return createResponse(res, false, null, code.INVALID, message.fields_invalid )
    }

    const portfolio = await getPortfolioActivities(req.params.portfolioId, user_id)

    if (!portfolio) {
      return createResponse(res, false, null, code.ERROR, message.server_error )
    }

    // const params = {}

    // for (let i = 1; i <= totalRecord / 30000; i++) {
    //
    // }

    if (exportsCSV) {

    }
    return createResponse(res, true, portfolio)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  exportActivityPortFolio,
}
