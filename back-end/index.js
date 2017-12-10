const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const quiz = require('./quiz')
const cors = require('cors')
const { wechatAPI, User } = require('./wechat')
const mongoose = require('mongoose')
const P = require('bluebird')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017')
mongoose.Promise = require('bluebird')
var Schema = mongoose.Schema

wechatAPI(app)

var RecordSchema = new Schema({
  id: String,
  correctNum: Number,
  score: Number,
  timestamp: Date
})

var Record = mongoose.model('Record', RecordSchema)

function verifyUser(id) {
  return User.findOne({ _id: id })
}

app.post('/quiz', (req, res) => {
  var token = req.body.token
  verifyUser(token.id).then(user => {
    if (!user) {
      var msg = `No user with id: ${token.id}`
      console.log(msg)
      res.status(400).send(msg)
      return
    }
    var data = quiz.getQuizzes()
    res.send(data)
  })
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
    return P.resolve(false)
  }).then(r => {
    if (r) {
      res.send('Record updated.')
    } else {
      res.send('Record is not higher. No update.')
    }
  })
})

app.post('/bestrecord', (req, res) => {
  var token = req.body.token
  verifyUser(token.id).then(user => {
    if (!user) {
      var msg = `No user with id: ${token.id}`
      console.log(msg)
      res.status(400).send(msg)
      return
    }
    return findRecordById(token.id)
  }).then(record => {
    if (!record) {
      res.send({ correctNum: 0 })
    } else {
      res.send(record)
    }
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

app.listen(3000, () => console.log('twinword listening on port 3000!'))
