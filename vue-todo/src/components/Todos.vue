<template>
    <ul>
        <TodoItem v-for="(todo,index) in todos" :key="index" :todo="todo" :updateIsComplete="updateIsComplete" :updateTodo="updateTodo" :deleteTodo="deleteTodo"/>
    </ul>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
    name: 'Todo',
    components:{
        TodoItem
    },
    props:{
        todos: Array,
        updateIsComplete: Function,
        deleteTodo: Function,
        updateTodo: Function
    }
}
</script>

<style scoped>
ul{
    list-style: none;
}
</style>