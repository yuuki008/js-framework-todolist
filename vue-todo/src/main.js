import Vue from 'vue'
import App from './App'
import { firestorePlugin } from 'vuefire'
import store from './store'


import router from './router'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
