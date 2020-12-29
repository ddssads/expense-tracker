const Category = require('../category')
const db = require('../../config/mongoose')

const categorylist = [
  {
    name: '家居物業',
    icon: '<i class="fas fa-home"></i>',
    route: 'home'
  },
  {
    name: '交通出行',
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
// 連線成功
db.once('open', () => {
  categorylist.forEach(category => Category.create(category))
  console.log('done')
})
