const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const quiz = require('./quiz')
const cors = require('cors')
const wechat = require('./wechat')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017')

var Schema = mongoose.Schema

var recordSchema = new Schema({
  id: String,
  correctNum: Number,
  score: Number,
  timestamp: Date
})

var Record = mongoose.model('Record', recordSchema)

wechat(app)

app.get('/quiz', (req, res) => {
  var data = quiz.getQuizzes()
  res.send(data)
})

app.post('/test/login', (req, res) => {
  res.json({
    id: 1234,
    token: 1234
  })
})

app.post('/test/userinfo', (req, res) => {
  res.json({
    name: 'ricl'
  })
})

app.post('/uploadrecord', (req, res) => {
  var data = req.body.data
  var id = data.id
  var record = findRecordById(id)
  if (!record || isBetter(data, record)) {
    saveRecord(data)
  }
})

function findRecordById(id) {
  Record.find({ id: id }, (err, r) => {
    if (err) return console.error(err)
    console.log('found', JSON.stringify(r))
  })
}

function isBetter(a, b) {
  return a.correctNum > b.correctNum
}

function saveRecord(record) {
  Record.create(record, (err, r) => {
    if (err) return console.error(err)
    console.log('save done', JSON.stringify(r))
  })
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// saveRecord({ id: '1', correctNum: 1, score: 1, timestamp: new Date() })