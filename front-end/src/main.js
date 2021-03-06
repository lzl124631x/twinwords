// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './svg-icon'

Vue.config.productionTip = false

window.debug = {
  debug: true,
  log() {
    if (this.debug && console.log) console.log.apply(null, arguments)
  },
  info() {
    if (this.debug && console.log) console.log.apply(null, arguments)
  },
  error() {
    if (this.debug && console.log) console.error.apply(null, arguments)
  }
}

window.store = {
  state: {
    correctNum: 0,
    history: [],
    user: { name: undefined },
    record: { correctNum: undefined },
    ranking: [],
    myRank: undefined,
    lastBestRecord: { correctNum: undefined }
  },
  reset() {
    this.state.correctNum = 0
    this.state.history = []
  },
  pushHistory(zh, en, correct) {
    if (correct) ++this.state.correctNum
    this.state.history.push({ zh: zh, en: en, correct: correct })
  },
  updateUserInfo (userinfo) {
    this.state.user.name = userinfo.name
  },
  updateBestRecord (best) {
    this.state.lastBestRecord.correctNum = this.state.record.correctNum
    this.state.record.correctNum = best.correctNum
  },
  updateRanking (ranking) {
    this.state.ranking = ranking.rankList
    this.state.myRank = ranking.userRank
  }
}

Vue.component('rank-list', require('./components/RankList.vue').default)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
