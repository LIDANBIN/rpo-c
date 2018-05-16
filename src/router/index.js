import Vue from 'vue'
import Router from 'vue-router'

import Observer from '@/observer/observer'
import Recommend from '@/recommend/recommend'
import Avatar from '@/avatar/avatar'

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
    },
    {
      path: '/usercenter',
      component: Avatar
    }
  ]
})
