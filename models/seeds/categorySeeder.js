const Category = require('../category')
const mongoose = require('mongoose')

const categorylist = [
  {
    name: '家居物業',
    icon: '<i class="fas fa-home"></i>',
    route: 'home'
  },
  {
    name: '交通出行 ',
    icon: '<i class="fas fa-shuttle-van"></i>',
    route: 'traffic'
  },
  {
    name: '休閒娛樂',
    icon: '<i class="fas fa-grin-beam"></i>',
    route: 'fun'
  },
  {
    name: '餐飲食品',
    icon: '<i class="fas fa-utensils"></i>',
    route: 'food'
  },
  {
    name: '其他',
    icon: '<i class="fas fa-pen"></i>',
    route: 'other'
  }
]

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  categorylist.forEach(category => Category.create(category))
  console.log('done')
})
