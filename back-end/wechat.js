const OAuth = require('wechat-oauth')

const client = new OAuth('wx8dbce39be0717e01', '57bb71ba517cdfd1dbff1b24a97dfbde');

module.exports = (app) => {
  app.post('/wechat/login', (req, res) => {
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

  app.post('/wechat/userinfo', (req, res) => {
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
}
