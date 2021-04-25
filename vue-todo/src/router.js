import Vue from 'vue'
import Router from 'vue-router'
import Todos from './pages/Todo.vue'
import Home from './pages/Home.vue'
import SignUp from './pages/SignUp.vue'
import SignIn from './pages/SignIn.vue'
import './assets/index.css'

import { auth } from './db'
import { db } from '../../jquery-todo/src/db'
import store from './store'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/sign_up',
      name: 'sign_up',
      component: SignUp
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === "/todos" || "/") {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const id = user.uid
        db.collection('users').doc(id).get().then((snapshot) => {
          const data = snapshot.data()
          if (!data) {
            alert('ユーザーデータが存在しません')
            next({ path: 'sign_in' })
            return
          }
          console.log(data)
          next()
        })
      } else {
        next({ path: 'sign_in'});
      }
    })
  } else {
    next()
  }
})

export default router