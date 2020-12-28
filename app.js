const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const mongoose = require('mongoose')

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

//set routes
app.get('/', (req, res) => {
  console.log(req.query.category)
  res.render('index')
})

app.get('/expense/new', (req, res) => {
  res.render('new')
})

//start and listen server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
