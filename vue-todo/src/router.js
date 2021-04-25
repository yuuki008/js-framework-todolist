import Vue from 'vue'
import Router from 'vue-router'
import Todos from './pages/Todo.vue'
import Home from './pages/Home.vue'
import SignUp from './pages/SignUp.vue'
import SignIn from './pages/SignIn.vue'

import './assets/index.css'

import { Firebase, auth } from './db'
import VueRouter from 'vue-router'
import { db } from '../../jquery-todo/src/db'

Vue.use(Router)

const routes = [
    {
      path: '/sign_up',
      name: 'sign_up',
      component: SignUp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn,
      meta: {
        requiresAuth: true
      }
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


const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach( async (to, from, next) => {
  const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
  const user = await checkAuth()

  if (!requiresAuth && !user) {
    next({ path: '/sign_in'});
  } else {
    next()
  }
})

const checkAuth = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export default router