import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isSignIn: false,
    uid: ""
  },
  mutations: {
    updateUser(state, user) {
      state.uid = user.uid
      state.isSignIn = true
    }
  },
  actions: {
    auth(context, user) {
      context.commit('updateUser', user)
    }
  }
})

export default store