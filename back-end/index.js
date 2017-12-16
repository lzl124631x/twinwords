const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const quiz = require('./quiz')
const cors = require('cors')
const { wechatAPI, User } = require('./wechat')
const mongoose = require('mongoose')
const P = require('bluebird')
const { findOneOrCreate } = require('./util')
var router = express.Router();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017')
mongoose.Promise = require('bluebird')
var Schema = mongoose.Schema

wechatAPI(router)

var RecordSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  correctNum: { type: Number, default: 0 },
  score: Number
},
{ timestamps: true })

RecordSchema.statics.findOneOrCreate = findOneOrCreate
var Record = mongoose.model('Record', RecordSchema)

function verifyUser(token, res) {
  return User.findOne({ _id: token.id }).then(user => {
    if (!user) {
      var msg = `No user with id: ${token.id}`
      console.log(msg)
      res.status(400).send(msg)
      return P.reject()
    }
    return user
  })
}

router.get('/', (req, res) => { res.send("Hi") })

router.post('/quiz', (req, res) => {
  var token = req.body.token
  verifyUser(token, res).then(user => {
    var data = quiz.getQuizzes()
    res.send(data)
  })
})

router.post('/test/login', (req, res) => {
  res.json({
    id: 1234,
    token: 1234
  })
})

router.post('/test/userinfo', (req, res) => {
  res.json({
    name: 'ricl'
  })
})

router.post('/uploadrecord', (req, res) => {
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

router.post('/bestrecord', (req, res) => {
  var token = req.body.token
  verifyUser(token, res).then(user => {
    return findRecordByUserId(token.id)
  }).then(record => {
    res.send(record)
  })
})

router.post('/ranking', (req, res) => {
  var token = req.body.token
  var limit = req.body.params.limit
  verifyUser(token, res).then(user => {
    return getUserRankAndRankList(token.id, limit)
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

function getUserRankAndRankList(userId, limit) {
  return P.join(getUserRank(userId), getRankList(limit), (userRank, rankList) => {
    return { userRank: userRank, rankList: rankList }
  })
}

function getRankList(limit) {
  return Record.find({}).sort({ correctNum: -1, updatedAt: 1 }).limit(limit).populate('user', 'name');
}

function getUserRank(userId) {
  return findRecordByUserId(userId).then(record => {
    return Record.count({ $or: [
      { correctNum: { $gt: record.correctNum }},
      { correctNum: { $eq: record.correctNum }, updatedAt: { $lt: record.updatedAt }}
      ]})
  })
}

app.use('/api', router);
app.listen(3000, () => console.log('twinword listening on port 3000!'))