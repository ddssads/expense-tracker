const Record = require('../record')
const mongoose = require('mongoose')

const recordlist = [
  {
    name: '早餐',
    category: '餐飲食品',
    date: '2020-12-28',
    amount: 128,
    icon: '<i class="fas fa-utensils"></i>'
  },
  {
    name: '高鐵 ',
    category: '交通出行',
    date: '2020-12-28',
    amount: 800,
    icon: '<i class="fas fa-shuttle-van"></i>'
  },
  {
    name: '電影',
    category: '休閒娛樂',
    date: '2020-12-28',
    amount: 450,
    icon: '<i class="fas fa-grin-beam"></i>'
  },
  {
    name: '買電視',
    category: '家居物業',
    date: '2020-12-28',
    amount: 16000,
    icon: '<i class= "fas fa-home"></i>'
  },
  {
    name: '借錢',
    category: '其他',
    date: '2020-12-28',
    amount: 5000,
    icon: '<i class="fas fa-pen"></i>'
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
  recordlist.forEach(record => Record.create(record))
  console.log('done')
})
