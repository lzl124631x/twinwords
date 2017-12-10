import P from 'bluebird'
import axios from 'axios'
import cache from './cache'
import util from './util'

const backendUrl = 'http://localhost:3000'
var loginDeferred = P.pending()

function authPost(url, params) {
  return loginDeferred.promise.then(token => {
    return axios.post(backendUrl + url, { params: params, token: token })
  })
}

function wechatLogin() {
  var code = util.getQuery('code')
  if (!code) {
    alert('No code provided. Failed to login from WeChat.')
    loginDeferred.reject()
  } else {
    var token = cache.getJSON(code)
    if (token) {
      loginDeferred.resolve(token)
    } else {
      post('/wechat/login', {
          code: code
        })
        .then(res => {
          token = res.data
          cache.setJSON(code, token)
          debug.log('wechatLogin', token)
          loginDeferred.resolve(token)
        })
        .catch(err => {
          debug.error('wechatLogin', err)
          loginDeferred.reject()
        })
    }
  }
  return loginDeferred.promise
}


function wechatUserInfo() {
  return loginDeferred.promise.then(token => {
    return authPost('/wechat/userinfo', {
        openid: token.openid
      })
      .then(res => {
        debug.log('wechatUserInfo', res)
        return res.data
      })
      .catch(err => debug.error('userinfo', err))
  })
}

function testLogin() {
  const id = 1234
  token = cache.getJSON(id)
  if (token) {
    return P.resolve(token)
  }
  return new P((resolve, reject) => {
    post('/test/login')
      .then(res => {
        token = res.data
        cache.setJSON(id, token)
        resolve(token)
      })
      .catch(err => {
        debug.error(id, err)
        reject()
      })
  })
}

function testUserInfo() {
  return post('/test/userinfo')
    .then(res => {
      debug.log('userinfo', res.data)
      window.user = res.data
    })
    .catch(err => debug.error('userinfo', err))
}

var EnvEnum = {
  Web: 0,
  WeChat: 1
}

var ENV = (function() {
  return EnvEnum.WeChat
}())

export default {
  getQuizzes() {
    return authPost('/quiz')
      .then(res => res.data)
  },
  login() {
    switch (ENV) {
      case EnvEnum.WeChat:
        return wechatLogin()
      default:
        return testLogin()
    }
  },
  userinfo(openid) {
    switch (ENV) {
      case EnvEnum.WeChat:
        return wechatUserInfo()
      default:
        return testUserInfo()
    }
  },
  uploadRecord(record) {
    return authPost('/uploadrecord', record)
      .then(res => res.data)
  },
  bestRecord() {
    return authPost('/bestrecord')
      .then(res => res.data)
  },
  ranking() {
    return authPost('/ranking')
      .then(res => res.data)
  }
}
