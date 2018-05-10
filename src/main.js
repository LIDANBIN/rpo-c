import Vue from 'vue'
import App from './App'
import router from './router'
import '&/style/index.styl'
import '&/scripts/flexible'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
