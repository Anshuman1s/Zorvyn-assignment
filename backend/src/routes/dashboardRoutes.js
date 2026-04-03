const express = require('express')
const router= express.Router()

const{
  getSummary,
  getCategoryData,
  getRecent,
  getMonthly
} = require('../controllers/dashboardController')

const authMiddleware= require('../middleware/authMiddleware')
const roleMiddleware= require('../middleware/roleMiddleware')

router.get('/summary',authMiddleware,roleMiddleware('admin','analyst','viewer'),getSummary)
router.get('/category',authMiddleware,roleMiddleware('admin','analyst'), getCategoryData)
router.get('/recent', authMiddleware,roleMiddleware('admin','analyst','viewer'), getRecent)
router.get('/monthly', authMiddleware,roleMiddleware('admin','analyst'), getMonthly)

module.exports= router