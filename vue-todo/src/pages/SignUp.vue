<template>
  <div class="formlist">
    <h2>
      sign_up
    </h2>
    <input type="text" v-model="name" placeholder="username">
    <input type="email" v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">
    <input type="password" v-model="confirmPassword" placeholder="confirm password">
    <div class="margin-10">
      <button v-on:click="signUp()">signUp</button>
    </div>
  </div>
</template>

<script>
import { auth, db, timestamp } from '../db'

export default {
  name: 'SignUp',
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  },
  methods: {
    signUp() {
      if (this.name === "" || this.email === "" || this.password === ""){
        alert(('必須項目入れんかい'))
        return false
      }
      if(this.password !== this.confirmPassword){
        alert('パスワード確認せんかい')
        return false
      }
      auth.createUserWithEmailAndPassword(this.email, this.password).then((result) => {
        const user = result.user
        if (user) {
          const id = user.uid
          const data = {
            id: id,
            name: this.name,
            email: this.email,
            created_at: timestamp.now()
          }
          db.collection('users').doc(id).set(data).then(() => {
            this.$router.push('/sign_in')
          })
        }
      })
    }
  }
}
</script>
