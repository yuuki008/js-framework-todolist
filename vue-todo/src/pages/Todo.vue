<template>
  <div>
    <header-links/>
    <div>
      <h2>Vue ToDo</h2>
      <todo-list/>
    </div>
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue'
import HeaderLinks from '../components/HeaderLinks.vue'

export default {
  name: 'Todos',
  components: {
    TodoList,
    HeaderLinks,
  },
}
</script>
