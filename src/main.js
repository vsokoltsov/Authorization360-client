import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { router } from './routes'
import { store } from './store'

import Default from './layouts/Default.vue'
import Authorization from './layouts/Authorization.vue'

Vue.component('default-layout', Default)
Vue.component('authorization-layout', Authorization)

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
