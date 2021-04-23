import Vue from 'vue'
import App from './App'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: process.env.FIRE_BASE.API_KEY,
  authDomain: process.env.FIRE_BASE.AUTH_DOMAIN,
  projectId: process.env.FIRE_BASE.PROJECT_ID,
  storageBucket: process.env.FIRE_BASE.STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_BASE.MESSAGING_SENDER_ID,
  appId: process.env.FIRE_BASE.APP_ID,
  measurementId: process.env.FIRE_BASE.MESUREMENT_ID,
};

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
