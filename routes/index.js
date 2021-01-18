const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')
const expenseTracker = require('./modules/expensetracker')


router.use('/expense', authenticator, expenseTracker)
router.use('/users', user)
router.use('/', authenticator, home)

module.exports = router