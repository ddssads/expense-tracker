const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const addIcon = require('../../addIcon')
const getMonth = require('../../month')

router.get('/', (req, res) => {
  const monthValue = req.query.month
  const categoryName = req.query.category
  const userId = req.user._id

  let query = {
    dateSearch: { date: { $regex: `[0-9]{4}-${monthValue}-[0-9]{2}` }, userId },
    categorySearch: { category: categoryName, userId },
    combineSearch: { $and: [{ category: categoryName, userId }, { date: { $regex: `[0-9]{4}-${monthValue}-[0-9]{2}` }, userId }] }
  }
  let months = [
    { name: '一月', value: '01' },
    { name: '二月', value: '02' },
    { name: '三月', value: '03' },
    { name: '四月', value: '04' },
    { name: '五月', value: '05' },
    { name: '六月', value: '06' },
    { name: '七月', value: '07' },
    { name: '八月', value: '08' },
    { name: '九月', value: '09' },
    { name: '十月', value: '10' },
    { name: '十一月', value: '11' },
    { name: '十二月', value: '12' },
  ]
  let totalAmount = 0
  //一開始的畫面&&month及category條件都為全部
  if ((!monthValue && !categoryName) || (monthValue === '' && categoryName === '')) {
    return Record.find()
      .lean()
      .then(records => {
        records.forEach(record => {
          totalAmount += record.amount
          record.icon = addIcon(record.category)
        })
        Category.find()
          .lean()
          .then(categorys => res.render('index', { records, totalAmount, categorys, months }))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }
  //month條件為全部
  if (monthValue === '') {
    return Record.find(query.categorySearch)
      .lean()
      .then(records => {
        records.forEach(record => {
          totalAmount += record.amount
          record.icon = addIcon(record.category)
        })
        Category.find()
          .lean()
          .then(categorys => {
            categorys = categorys.filter(category => category.name !== categoryName)
            //傳找到的收支紀錄、總金額、類別(下拉選單用)、月份(下拉選單用)、categoryName(顯示當前類別的篩選條件)
            res.render('index', { records, totalAmount, categorys, months, categoryName })
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }
  //category條件為全部
  if (categoryName === '') {
    return Record.find(query.dateSearch)
      .lean()
      .then(records => {
        records.forEach(record => {
          totalAmount += record.amount
          record.icon = addIcon(record.category)
        })
        Category.find()
          .lean()
          .then(categorys => {
            const transferMonth = getMonth(monthValue)
            months = months.filter(month => month.value !== monthValue)
            //傳找到的收支紀錄、總金額、類別(下拉選單用)、月份(下拉選單用)、transferMonth(顯示當前月份的篩選條件)
            res.render('index', { records, totalAmount, categorys, months, transferMonth })
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }
  //依照類別及月分下去篩選
  return Record.find(query.combineSearch)
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        record.icon = addIcon(record.category)
      })
      Category.find()
        .lean()
        .then(categorys => {
          const transferMonth = getMonth(monthValue)
          months = months.filter(month => month.value !== monthValue)
          categorys = categorys.filter(category => category.name !== categoryName)
          //傳找到的收支紀錄、總金額、類別(下拉選單用)、月份(下拉選單用)、transferMonth(顯示當前月份的篩選條件)、categoryName(顯示當前類別的篩選條件)
          res.render('index', { records, totalAmount, categorys, months, transferMonth, categoryName })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

})

module.exports = router