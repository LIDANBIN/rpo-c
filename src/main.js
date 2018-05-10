import Vue from 'vue'
import App from './App'
import router from './router'
import './common/style/index.styl'
import './common/scripts/flexible'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
