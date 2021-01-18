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
  const userId = req.user._id
  const newExpense = req.body
  const date = req.body.date
  const category = req.body.category
  newExpense.icon = addIcon(category)
  newExpense.userId = userId
  return Record.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//取得編輯頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
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
  const userId = req.user._id
  const _id = req.params.id
  const newExpense = req.body
  newExpense.icon = addIcon(newExpense.category)
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, newExpense)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//刪除支出
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router