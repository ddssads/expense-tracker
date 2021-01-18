const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const recordlist = [
  {
    name: '早餐',
    category: '餐飲食品',
    date: '2020-12-28',
    amount: 128,
    merchant: '美兒美'
  },
  {
    name: '高鐵 ',
    category: '交通出行',
    date: '2020-12-28',
    amount: 800,
    merchant: '台灣高鐵'
  },
  {
    name: '電影',
    category: '休閒娛樂',
    date: '2020-12-28',
    amount: 450,
    merchant: '華納威秀'
  },
  {
    name: '買電視',
    category: '家居物業',
    date: '2020-12-28',
    amount: 16000,
    merchant: '三星'
  },
  {
    name: '借錢',
    category: '其他',
    date: '2020-12-28',
    amount: 5000,
    merchant: '無'
  }
]

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

// 連線成功
db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER
      .password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 5 },
        (_, i) => Record.create({ ...recordlist[i], userId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
