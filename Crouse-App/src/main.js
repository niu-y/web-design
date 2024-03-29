import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router, //$route  $router
  store,
  render: h => h(App)
}).$mount('#app')
