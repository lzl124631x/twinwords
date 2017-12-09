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
  var token = req.body.token
  var newRecord = req.body.params
  findRecordById(token.id).then(record => {
    if (!record || isBetter(newRecord, record)) {
      return saveRecord(token.id, newRecord)
    }
    res.send('Record is not higher. No update.')
  }).then(() => {
    res.send('Record updated.')
  })
})

function findRecordById(id) {
  return Record.findOne({ id: id })
}

function isBetter(a, b) {
  return a.correctNum > b.correctNum
}

function saveRecord(id, record) {
  record.id = id
  return Record.update({ id: id }, record, { upsert: true })
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))