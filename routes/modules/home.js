const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      Category.find()
        .lean()
        .then(categorys => res.render('index', { records, categorys, totalAmount }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router