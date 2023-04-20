const express = require('express')
const router = express.Router()

const activityPorfolioController = require('../controllers/activityPorfolio.controller')

router.get('/:portfolioId', activityPorfolioController.ExportActivityPortFolio)

module.exports = router
