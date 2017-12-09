import P from 'bluebird'
import axios from 'axios'
import cache from './cache'
import util from './util'

const backendUrl = 'http://localhost:3000'
var token = null

function get(url) {
  return axios.get(backendUrl + url)
    .catch(err => console.error(url, err))
}

function post(url, params) {
  return axios.post(backendUrl + url, params)
  // .catch(err => console.error(url, err)) // Axios `catch` changed the promise: https://github.com/axios/axios/issues/1216
}

function authPost(url, params) {
  return axios.post(backendUrl + url, { params: params, token: token })
}

function wechatLogin() {
  var code = util.getQuery('code')
  if (!code) {
    alert('Failed to login from WeChat.')
    return P.reject()
  }
  token = cache.getJSON(code)
  if (token) {
    return P.resolve(token)
  }
  return new P((resolve, reject) =>
    post('/wechat/login', {
      code: code
    })
    .then(res => {
      token = res.data
      cache.setJSON(code, token)
      debug.log('wechatLogin', token)
      resolve(token)
    })
    .catch(err => {
      debug.error('wechatLogin', err)
      reject()
    }))
}

function wechatUserInfo() {
  return post('/wechat/userinfo', {
      openid: token.openid
    })
    .then(res => {
      debug.log('wechatUserInfo', res)
    })
    .catch(err => debug.error('userinfo', err))
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

function wrapper(func) {
  if (!token) {
    alert('Please login first!')
    return P.reject()
  }
  func()
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
    wrapper(() =>
      get('/quiz')
      .then(res => res.data))
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
    wrapper(() => {
      switch (ENV) {
        case EnvEnum.WeChat:
          return wechatUserInfo()
        default:
          return testUserInfo()
      }
    })
  },
  uploadRecord(record) {
    wrapper(() => {
      authPost('/uploadrecord', record)
        .then(res => res.data)
    })
  }
}
