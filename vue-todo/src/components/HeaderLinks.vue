<template>
  <ul class="tab-menu-base">
    <li><router-link to="/">home</router-link></li>
    <li><router-link to="/todos">todos</router-link></li>
    <!-- <li v-model="">sign_out</li> -->
  </ul>
</template>
<script>
export default {
  name: 'HeaderLinks',
  methods:{
    signOut() {
    }
  }
}
</script>
