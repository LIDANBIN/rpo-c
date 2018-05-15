import Vue from 'vue'
import Router from 'vue-router'

import Observer from '@/observer/observer'
import Recommend from '@/recommend/recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/observer'
    },
    {
      path: '/observer',
      component: Observer
    },
    {
      path: '/recommend',
      component: Recommend
    }
  ]
})
