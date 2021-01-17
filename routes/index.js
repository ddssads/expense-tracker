const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const user = require('./modules/user')
const expenseTracker = require('./modules/expensetracker')

router.use('/', home)
router.use('/expense', expenseTracker)
router.use('/users', user)

module.exports = router