import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { router } from './routes'
import { store } from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import Default from './layouts/Default.vue'
import Authorization from './layouts/Authorization.vue'

Vue.use(Buefy)

Vue.component('default-layout', Default)
Vue.component('authorization-layout', Authorization)

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
