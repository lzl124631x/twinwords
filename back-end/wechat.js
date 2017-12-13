const OAuth = require('wechat-oauth')
const mongoose = require('mongoose')
const appConfig = require('./static/appConfig.json')
const { findOneOrCreate } = require('./util')

var Schema = mongoose.Schema
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

UserSchema.statics.findOneOrCreate = findOneOrCreate
UserSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

var User = mongoose.model('User', UserSchema)
exports.User = User

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

exports.wechatAPI = (app) => {
  app.post('/wechat/login', (req, res) => {
    client.getAccessToken(req.body.code, (err, result) => {
      if (err) {
        console.log(err, result)
        res.status(400).json(result)
        return
      }

      wechat.updateOAuth(result.data)
      wechat.getUser(result.data.openid).then(user => {
        res.json(user)
      })
    })
  })

  app.post('/wechat/userinfo', (req, res) => {
    var openid = req.body.params.openid
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
      wechat.updateUser(openid, userinfo).exec(err => {
        if (err) console.error(err)
        res.json(userinfo)
      })
    })
  })
}
