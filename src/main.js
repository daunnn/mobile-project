import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import vuetify from './plugins/vuetify'
import router from './route/index.js'

//import 'chart.js'
//import 'hchs-vue-charts'
//import 'vue-chartjs'

//Vue.use(window.VueCharts)

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyifr3-epVwTJUDOhbndrNVz7fcjpJzOI",
  authDomain: "mobile-phase2.firebaseapp.com",
  projectId: "mobile-phase2",
  storageBucket: "mobile-phase2.appspot.com",
  messagingSenderId: "278698809202",
  appId: "1:278698809202:web:52d8c5a76385f67139efeb",
  measurementId: "G-51W7LNW9DN"
};


const fb = initializeApp(firebaseConfig);

export {fb}

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
