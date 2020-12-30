const Category = require('../category')
const db = require('../../config/mongoose')
const addIcon = require('../../addIcon')

const categorylist = [
  {
    name: '家居物業',
    route: 'home'
  },
  {
    name: '交通出行',
    route: 'traffic'
  },
  {
    name: '休閒娛樂',
    route: 'fun'
  },
  {
    name: '餐飲食品',
    route: 'food'
  },
  {
    name: '其他',
    route: 'other'
  }
]
// 連線成功
db.once('open', () => {
  categorylist.forEach(category => {
    category.icon = addIcon(category.name)
    Category.create(category)
  })
  console.log('done')
})
