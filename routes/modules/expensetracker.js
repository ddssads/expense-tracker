const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const addIcon = require('../../addIcon')

//取得新增頁面
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categorys => res.render('new', { categorys }))
})
//新增支出
router.post('/create', (req, res) => {
  const newExpense = req.body
  const category = req.body.category
  newExpense.icon = addIcon(category)
  return Record.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//取得編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      Category.find()
        .lean()
        .then(categorys => {
          const newCategorys = categorys.filter(category => category.name !== record.category)
          res.render('edit', { record, categorys: newCategorys })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
//編輯支出
router.put('/:id', (req, res) => {
  const id = req.params.id
  const newExpense = req.body
  newExpense.icon = addIcon(newExpense.category)
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, newExpense)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//刪除支出
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//依類別顯示支出
router.get('/:category', (req, res) => {
  const keyword = req.params.category
  let totalAmount = 0
  Record.find({ category: keyword })
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        record.icon = addIcon(record.category)
      })
      Category.find()
        .lean()
        .then(categorys => res.render('index', { records, categorys, totalAmount }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router