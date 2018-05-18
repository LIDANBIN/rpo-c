import Vue from 'vue'
import Router from 'vue-router'

import Observer from '@/observer/observer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/observer'
    },
    {
      path: '/observer',
      component: Observer,
    },
    {
      path: '/observer/detail',
      component: resolve => require(['@/observer-detail/observer-detail'], resolve)
    },
    {
      path: '/recommend',
      component: resolve => require(['@/recommend/recommend'], resolve)
    },
    {
      path: '/recommend/detail',
      component: resolve => require(['@/recommend-detail/recommend-detail'], resolve)
    },
    {
      path: '/usercenter',
      component: resolve => require(['@/avatar/avatar'], resolve)
    }
  ]
})
