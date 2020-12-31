const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const addIcon = require('../../addIcon')

router.get('/', (req, res) => {
  let totalAmount = 0
  let showRecords = {}
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        record.icon = addIcon(record.category)
      })
      Category.find()
        .lean()
        .then(categorys => res.render('index', { records, totalAmount, categorys }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router