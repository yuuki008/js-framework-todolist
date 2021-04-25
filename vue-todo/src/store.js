// import Vue from 'vue'
// import Vuex from 'vuex'
// import { db } from '../../jquery-todo/src/db'
// import { auth } from './db'

// Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     isSignIn: false,
//     uid: ""
//   },
//   getters: {
//     isSignIn: (state) => state.isSignIn
//   },
//   mutations: {
//     sign_out_mutation(state) {
//       state.isSignIn = false,
//       state.uid = ""
//     },
//     sign_in_mutation(state, { id: id }) {
//       state.isSignIn = true
//       state.uid = id
//     }
//   },
//   actions: {
//     sign_in({ commit },{ email, password } ) {
//       console.log(email, password)
//       auth.signInWithEmailAndPassword(email, password)
//       .then((result) => {
//         const user = result.user
//         if (user) {
//           const id = user.uid
//           db.collection('users').doc(id).get().then((snapshot) => {
//             commit('sign_in_mutation', { id: id })
//           })
//         }
//       })
//     },
//     sign_out({ commit }) {
//       auth.signOut()
//       .then(() => {
//         console.log('サインアウト成功')
//         commit('sign_out_mutation')
//       })
//     },
//     listen_auth({ commit }) {
//       auth.onAuthStateChanged((user) => {
//         if (user) {
//           const id = user.uid
//           db.collection('users').doc(id).get().then((snapshot) => {
//             const data = snapshot.data()
//             if (!data) {
//               commit('sign_out_mutation')
//               return
//             }
//             commit('sign_in_mutation', { id: data.id })
//           })
//         } else {
//           commit('sign_out_mutation')
//         }
//       })
//     }
//   }
// })

// export default store