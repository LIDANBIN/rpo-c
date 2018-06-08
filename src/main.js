import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/store'

import FastClick from 'fastclick'

FastClick.attach(document.body);

import 'cropperjs/dist/cropper.css'

import '&/style/index.styl'
import '&/scripts/flexible'

import tool from "&/scripts/tools";
Vue.prototype._ = tool
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


import Toast from 'base/toast'
Vue.prototype.$toast = Toast
