const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const OAuth = require('wechat-oauth')
const quiz = require('./quiz')
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

const client = new OAuth('wx8dbce39be0717e01', '57bb71ba517cdfd1dbff1b24a97dfbde');

app.post('/login', (req, res) => {
  client.getAccessToken(req.body.code, (err, result) => {
    if (err) {
      console.log(err, result)
      res.status(400).json(result)
      return
    }
    console.log('login:', result)
    res.json(result)
  })
})

app.post('/userinfo', (req, res) => {
    client.getUser(req.body.openid, (err, result) => {
        if (err) {
            console.log('uesrinfo', err, result)
            res.status(400).json(result)
            return
        }
        console.log('userinfo', result)
        res.json(result)
    })
})

app.get('/quiz', (req, res) => {
  var data = quiz.getQuizzes()
  res.send(data)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
