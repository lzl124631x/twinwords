const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const quiz = require('./quiz')
const cors = require('cors')
const wechat = require('./wechat')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post('/score', (req, res) => {
  var data = req.body.data
  var id = data.id;
  var record = findRecordById(id)
  if (!record || isBetter(data, record)) {
    saveRecord(data)
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
