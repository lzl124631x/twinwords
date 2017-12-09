const OAuth = require('wechat-oauth')
const mongoose = require('mongoose')
const appConfig = require('./static/appConfig.json')

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId
var UserSchema = new Schema({
  wechatOpenId: String,
  name: String,
  gender: String,
  language: String,
  city: String,
  province: String,
  country: String,
  avatar: String
})

UserSchema.statics.findOneOrCreate = function(condition, callback) {
  return this.findOne(condition, (err, result) => {
    return result ? callback(err, result) : this.create(condition, (err, result) => callback(err, result))
  })
}

var User = mongoose.model('User', UserSchema)

var TokenSchema = new Schema({
  openid: String,
  access_token: String,
  create_at: Number,
  expires_in: Number,
  refresh_token: String,
  scope: String,
  unionid: String
})

TokenSchema.statics.getToken = function(openid, cb) {
  this.findOne({ openid: openid }, function(err, result) {
    if (err) throw err
    return cb(null, result)
  })
}

TokenSchema.statics.setToken = function(openid, token, cb) {
  var query = { openid: openid };
  var options = { upsert: true };
  this.update(query, token, options, function(err, result) {
    if (err) throw err;
    return cb(null);
  });
};

var Token = mongoose.model('Token', TokenSchema)

const client = new OAuth(appConfig.appId, appConfig.appSecret, Token.getToken.bind(Token), Token.setToken.bind(Token))

var wechat = {
  getUser(openid, callback) {
    return User.findOneOrCreate({ wechatOpenId: openid }, callback)
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

      wechat.updateOAuth(result.data)
      wechat.getUser(result.data.openid, (err, user) => {
        result.data.id = user.id
        console.log("!!!", result.data, user.id)
        res.json(result.data)
      })
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
