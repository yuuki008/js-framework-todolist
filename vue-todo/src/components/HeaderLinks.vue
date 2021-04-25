<template>
  <ul class="tab-menu-base">
    <li><router-link to="/">home</router-link></li>
    <li><router-link to="/todos">todos</router-link></li>
    <li><a class="signout" v-on:click="handleSignOut">sign_out</a></li>
  </ul>
</template>
<script>
import { auth } from '../db'

export default {
  name: 'HeaderLinks',
  methods:{
    handleSignOut() {
      if(!confirm("サインアウトしちゃうぞ")) return
      auth.signOut().then(() => {
        this.$router.push('sign_in')
      })
    }
  }
}
</script>
<style>

.signout{
  cursor: pointer;
  color: -webkit-link;
  text-decoration: underline;
}
</style>