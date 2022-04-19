import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import vuetify from './plugins/vuetify'
//import 'chart.js'
//import 'hchs-vue-charts'
//import 'vue-chartjs'

//Vue.use(window.VueCharts)

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
