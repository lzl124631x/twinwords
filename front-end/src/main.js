// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
    history: []
  },
  reset() {
    this.state.correctNum = 0
    this.state.history = []
  },
  pushHistory(zh, en, correct) {
    if (correct) ++this.state.correctNum
    this.state.history.push({ zh: zh, en: en, correct: correct })
  }
}

window.user = {}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
