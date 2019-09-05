import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { router } from './routes'
import { store } from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Default from './layouts/Default.vue'
import Authorization from './layouts/Authorization.vue'

import 'bulma/css/bulma.css'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('default-layout', Default)
Vue.component('authorization-layout', Authorization)


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuelidate)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
