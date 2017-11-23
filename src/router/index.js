import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import QuizPage from '@/components/QuizPage'
import ResultPage from '@/components/ResultPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizPage
    },
    {
      path: '/result',
      name: 'result',
      component: ResultPage
    }
  ]
})
