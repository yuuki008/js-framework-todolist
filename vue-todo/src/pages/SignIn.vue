<template>
  <div class="formlist">
    <h2>
      sign_in
    </h2>
    <input type="email" v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">
    <div class="margin-10">
      <button v-on:click="signIn()">sign in</button>
    </div>
    <router-link to="/sign_up">create account</router-link>
  </div>
</template>

<script>
import { auth, db } from '../db'

export default {
  name: 'SignIn',
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    signIn() {
      if (this.email === "" || this.password === "") {
        alert('必須項目入れんかい')
        return false
      }
      auth.signInWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        const user = result.user
        if (user) {
          db.collection('users').doc(user.uid).get()
          .then(() => {
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>
