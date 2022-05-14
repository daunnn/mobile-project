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
/*import 'firebase/firestore' 
import 'firebase/storage'
import { getFirestore } from 'firebase/firestore';*/
//import { getFirestore,collection,getDocs } from 'firebase/firestore/lite'; 
//import firebase from "firebase";


//import { getStorage } from "firebase/storage";
//import firebase from "firebase";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
//const fb = initializeApp(firebaseConfig);
//const db = firebase.firestore();
//const storage = getStorage(firebaseApp);
//const db = getFirestore(fb);

const fb = initializeApp(firebaseConfig);

export {fb}

//const db = firebase.firestore();

  /*storage.collection('calorie').get().then((결과)=>{
    결과.forEach((doc)=>{
      console.log(doc.data())
    })
  })*/

  /*Get a list of cities from your database
  async function getCities(db) {
    const calorieCol = collection(db, 'calorie');
    const calorie_Snapshot = await getDocs(calorieCol);
    const calorieList = calorie_Snapshot.docs.map(doc => doc.data());
    //console.log(calorieList);
    return calorieList;}
  
    getCities(db);*/

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
