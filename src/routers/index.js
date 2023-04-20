const activityPorfolioRouter = require('./activityPortfolio')

module.exports = (app)=> {
  app.use('/portfolio-activities', activityPorfolioRouter)
}
