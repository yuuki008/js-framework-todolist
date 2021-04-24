<template>
  <div>
    <div>
      <h2>Vue ToDo</h2>
    </div>

    <todo-list />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  },
  data: () => ({}),
}
</script>
