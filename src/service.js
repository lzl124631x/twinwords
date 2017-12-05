import P from 'bluebird'
import axios from 'axios'
import cache from './cache'

const backendUrl = 'http://localhost:3000'

function get(url) {
  return axios.get(backendUrl + url)
    .catch(err => console.error(url, err))
}

function post(url, params) {
  return axios.post(backendUrl + url, params)
  // .catch(err => console.error(url, err)) // Axios `catch` changed the promise: https://github.com/axios/axios/issues/1216
}

export default {
  getQuizzes() {
    return get('/quiz')
      .then(res => res.data)
  },
  login(code) {
    var auth = cache.getJSON(code)
    if (auth) {
      console.log('login info recovered: ', auth)
      return P.resolve(auth.data)
    }
    return new P((resolve, reject) =>
      post('/login', {
        code: code
      })
      .then(res => {
        console.log('then', res)
        cache.setJSON(code, res.data)
        resolve(res.data)
      })
      .catch(err => {
        console.error('login', err)
        reject()
      }))
  },
  userinfo(openid) {
    return post('/userinfo', {
        openid: openid
      })
      .then(res => {
        console.log('userinfo', res)
      })
      .catch(err => console.error('userinfo', err))
  }
}
