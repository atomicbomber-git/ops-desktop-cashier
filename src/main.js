import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App)
})

app.$mount('#app')

/* Load CSS */
require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/font-awesome/css/font-awesome.css')