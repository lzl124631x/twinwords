const OAuth = require('wechat-oauth')
const mongoose = require('mongoose')
const appConfig = require('./static/appConfig.json')

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId
var userSchema = new Schema({
  id: ObjectId,
  wechatOpenId: String,
  name: String,
  gender: String,
  language: String,
  city: String,
  province: String,
  country: String,
  avatar: String
})

var User = mongoose.model('User', userSchema)

var TokenSchema = new Schema({
  openid: String,
  access_token: String,
  create_at: Number,
  expires_in: Number,
  refresh_token: String,
  scope: String,
  unionid: String
})

TokenSchema.statics.getToken = function (openid, cb) {
  this.findOne({openid:openid}, function (err, result) {
    if (err) throw err
    return cb(null, result)
  })
}

TokenSchema.statics.setToken = function (openid, token, cb) {
  var query = {openid: openid};
  var options = {upsert: true};
  this.update(query, token, options, function (err, result) {
    if (err) throw err;
    return cb(null);
  });
};

var Token = mongoose.model('Token', TokenSchema)

const client = new OAuth(appConfig.appId, appConfig.appSecret, Token.getToken.bind(Token), Token.setToken.bind(Token))

var wechat = {
  createUser(openid) {
    return User.create({ wechatOpenId: openid })
  },
  getUser(openid) {
    return User.findOne({ wechatOpenId: openid })
  },
  getOrCreateUser(openid) {
    return this.getUser(openid).then(user => {
      if (!user) {
        console.log('user doesn\'t exist create new')
        return this.createUser(openid)
      }
      return user
    }).then(user => {
      console.log('done', user)
      return user
    })
  },
  deleteUser(openid) {
    return User.remove({ wechatOpenId: openid })
  },
  updateUser(openid, userinfo) {
    return User.update({ wechatOpenId: openid }, userinfo, { upsert: true })
  },
  updateOAuth(oauth) {
    return Token.update({ openid: oauth.openid }, oauth, { upsert: true }).exec()
  }
}

module.exports = (app) => {
  app.post('/wechat/login', (req, res) => {
    console.log(req.body.code)
    client.getAccessToken(req.body.code, (err, result) => {
      if (err) {
        console.log(err, result)
        res.status(400).json(result)
        return
      }

      console.log('login:', result)
      wechat.updateOAuth(result.data)
      wechat.getOrCreateUser(result.data.openid)
      res.json(result.data)
    })
  })

  app.post('/wechat/userinfo', (req, res) => {
    var openid = req.body.openid
    client.getUser(openid, (err, userinfo) => {
      if (err) {
        console.log('userinfo', err, userinfo)
        res.status(400).json(userinfo)
        return
      }
      console.log('userinfo', userinfo)
      userinfo.name = userinfo.nickname
      userinfo.gender = userinfo.sex.toString()
      userinfo.avatar = userinfo.headimgurl
      wechat.updateUser(openid, userinfo).exec((err, user) => {
        if (err) console.error(err)
        console.log('done user', err, user)
      })
      res.json(userinfo)
    })
  })
}
