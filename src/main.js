import Vue from 'vue'
import App from './App'
import router from './router'

import FastClick from 'fastclick'

FastClick.attach(document.body);

import 'cropperjs/dist/cropper.css'

import '&/style/index.styl'
import '&/scripts/flexible'

import tool from "&/scripts/tools";
Vue.prototype._ = tool

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
