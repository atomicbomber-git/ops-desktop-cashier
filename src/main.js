import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/font-awesome/css/font-awesome.css')