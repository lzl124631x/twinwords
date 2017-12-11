const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const quiz = require('./quiz')
const cors = require('cors')
const { wechatAPI, User } = require('./wechat')
const mongoose = require('mongoose')
const P = require('bluebird')
const { findOneOrCreate } = require('./util')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017')
mongoose.Promise = require('bluebird')
var Schema = mongoose.Schema

wechatAPI(app)

var RecordSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  correctNum: { type: Number, default: 0 },
  score: Number
},
{ timestamps: true })

RecordSchema.statics.findOneOrCreate = findOneOrCreate
var Record = mongoose.model('Record', RecordSchema)

function verifyUser(id) {
  return User.findOne({ _id: id }).then(user => {
    if (!user) {
      var msg = `No user with id: ${token.id}`
      console.log(msg)
      res.status(400).send(msg)
      return P.reject()
    }
    return user
  })
}

app.post('/quiz', (req, res) => {
  var token = req.body.token
  verifyUser(token.id).then(user => {
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
  findRecordByUserId(token.id).then(record => {
    if (isBetter(newRecord, record)) {
      return saveRecord(token.id, newRecord)
    }
    return false
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
    return findRecordByUserId(token.id)
  }).then(record => {
    res.send(record)
  })
})

app.post('/ranking', (req, res) => {
  var token = req.body.token
  verifyUser(token.id).then(user => {
    return getRanking(50)
  }).then(ranking => {
    console.log('ranking', ranking)
    res.send(ranking)
  })
})

function findRecordByUserId(userId) {
  return Record.findOneOrCreate({ user: userId })
}

function isBetter(a, b) {
  return a.correctNum > b.correctNum
}

function saveRecord(userId, record) {
  record.user = userId
  return Record.update({ user: userId }, record, { upsert: true })
}

function getRanking(num) {
  return Record.find({}).sort({ correctNum: -1, updatedAt: 1 }).limit(num).populate('user', 'name');
}

app.listen(3000, () => console.log('twinword listening on port 3000!'))
