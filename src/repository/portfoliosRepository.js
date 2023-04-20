const { flag } = require('../constant')
const db = require('../services/db.service')

const getPortfolioActivities = async (portfolio_id, user_id) => {
  return await db('portfolios')
    .select(
      'portfolio_id',
      'account_no',
      'platform',
      'server_id',
      'account_mode',
      'portfolio_name',
      'currency',
    )
    .where({
      portfolio_id,
      delete_flag: flag.FALSE,
      user_id,
    })
    .first()
}

module.exports={
  getPortfolioActivities,
}
