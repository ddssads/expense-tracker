const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const mongoose = require('mongoose')
const Category = require('./models/category')
const Record = require('./models/record')
const record = require('./models/record')
const addIcon = require('./addIcon')
const category = require('./models/category')
const methodOverride = require('method-override')

const app = express()
const port = 3000
//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//set routes
app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      Category.find()
        .lean()
        .then(categorys => res.render('index', { records, categorys, totalAmount }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
app.get('/expense/new', (req, res) => {
  Category.find()
    .lean()
    .then(categorys => res.render('new', { categorys }))
})
app.post('/expense/create', (req, res) => {
  const newExpense = req.body
  const category = req.body.category
  newExpense.icon = addIcon(category)
  return Record.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.get('/expense/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      Category.find()
        .lean()
        .then(categorys => res.render('edit', { record, categorys }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
app.put('/expense/:id', (req, res) => {
  const id = req.params.id
  const newExpense = req.body
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, newExpense)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.delete('/expense/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.get('/expense/:category', (req, res) => {
  const keyword = req.params.category
  let totalAmount = 0
  Record.find({ category: keyword })
    .lean()
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      Category.find()
        .lean()
        .then(categorys => res.render('index', { records, categorys, totalAmount }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
//start and listen server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
