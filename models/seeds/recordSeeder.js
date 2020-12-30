const Record = require('../record')
const db = require('../../config/mongoose')

const recordlist = [
  {
    name: '早餐',
    category: '餐飲食品',
    date: '2020-12-28',
    amount: 128,
  },
  {
    name: '高鐵 ',
    category: '交通出行',
    date: '2020-12-28',
    amount: 800,
  },
  {
    name: '電影',
    category: '休閒娛樂',
    date: '2020-12-28',
    amount: 450,
  },
  {
    name: '買電視',
    category: '家居物業',
    date: '2020-12-28',
    amount: 16000,
  },
  {
    name: '借錢',
    category: '其他',
    date: '2020-12-28',
    amount: 5000,
  }
]

// 連線成功
db.once('open', () => {
  recordlist.forEach(record => Record.create(record))
  console.log('done')
})
