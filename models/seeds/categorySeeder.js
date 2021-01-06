const Category = require('../category')
const db = require('../../config/mongoose')
const addIcon = require('../../addIcon')

const categorylist = [
  {
    name: '家居物業',
  },
  {
    name: '交通出行',
  },
  {
    name: '休閒娛樂',
  },
  {
    name: '餐飲食品',
  },
  {
    name: '其他',
  }
]
// 連線成功
db.once('open', () => {
  categorylist.forEach(category => {
    category.icon = addIcon(category.name)
    Category.create(category)
      .then(() => {
        console.log('done')
        return db.close()
      })
      .then(() => {
        console.log('db connection close')
      })
  })
})
