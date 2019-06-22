import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'

Vue.config.productionTip = false

import VueGoogleCharts from 'vue-google-charts' 
Vue.use(VueGoogleCharts)
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.prototype.$EventBus = new Vue();	

const base = axios.create({
  baseURL: 'https://urpx.herokuapp.com/',
})

Vue.prototype.$http = base

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
