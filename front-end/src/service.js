import P from 'bluebird'
import axios from 'axios'
import cache from './cache'
import util from './util'

const backendUrl = 'http://localhost:3000'
var auth = null

function get(url) {
  return axios.get(backendUrl + url)
    .catch(err => console.error(url, err))
}

function post(url, params) {
  return axios.post(backendUrl + url, params)
  // .catch(err => console.error(url, err)) // Axios `catch` changed the promise: https://github.com/axios/axios/issues/1216
}

function wechatLogin() {
  var code = util.getQuery('code')
  if (!code) {
    alert('Failed to login from WeChat.')
    return P.reject()
  }
  auth = cache.getJSON(code)
  if (auth) {
    debug.log('login info recovered: ', auth)
    return P.resolve(auth.data)
  }
  return new P((resolve, reject) =>
    post('/wechat/login', {
      code: code
    })
    .then(res => {
      cache.setJSON(code, res.data)
      resolve(res.data)
    })
    .catch(err => {
      debug.error('login', err)
      reject()
    }))
}

function wechatUserInfo() {
  return post('/wechat/userinfo')
      .then(res => {
        debug.log('userinfo', res)
      })
      .catch(err => debug.error('userinfo', err))
}

function testLogin() {
  const id = 1234
  auth = cache.getJSON(id)
  if (auth) {
    return P.resolve(auth)
  }
  return new P((resolve, reject) => {
    post('/test/login')
      .then(res => {
        auth = res.data
        cache.setJSON(id, auth)
        resolve(auth)
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

function wrapper(func) {
  if (!auth) {
    alert('Please login first!')
    return P.reject()
  }
  func()
}

var EnvEnum = {
  Web: 0,
  WeChat: 1
}

var ENV = (function () {
  return EnvEnum.Web
}())

export default {
  getQuizzes() {
    wrapper(() =>
      get('/quiz')
      .then(res => res.data))
  },
  login() {
    switch (ENV) {
      case EnvEnum.WeChat:return wechatLogin()
      default: return testLogin()
    }
  },
  userinfo(openid) {
    wrapper(() => {
      switch (ENV) {
        case EnvEnum.WeChat: return wechatUserInfo()
        default: return testUserInfo()
      }
    })
  },
  uploadRecord(record) {
    wrapper(() => {
      post('/uploadrecord', { record: record })
      .then(res => res.data)
    })
  }
}
