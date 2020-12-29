const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expenseTracker = require('./modules/expensetracker')

router.use('/', home)
router.use('/expense', expenseTracker)

module.exports = router