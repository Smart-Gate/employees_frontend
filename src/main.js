import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
