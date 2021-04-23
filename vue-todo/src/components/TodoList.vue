<template>
  <div class="pt-3">
    <input type="text" v-model="newTodo">
    <button type="submit" v-on:click="addItem()">Add</button>
    <ul max-width="400" v-for="todo in todos" :key="todo.id">
      <li style="display: flex">
        <div style="padding: 10px">
          <input type="checkbox" v-model="todo.isComplete" v-on:click="IsCompleteToggle(todo)">
        </div>
        <div style="padding: 10px">
        {{ todo.todo }}
        </div>
        <button style="margin: 10px" v-on:click="deleteTodo(todo.id)">delete</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { db } from '../db'

export default {
  name: 'TodoList',
  data() {
    return {
      todos: [],
      newTodo: '',
    }
  },
  created: function() {
    db.collection('todos').onSnapshot(snapshots => {
      let newTodos = []
      snapshots.forEach(snapshot => {
        newTodos.push(snapshot.data())
      })
      this.todos = newTodos
    })
  },
  methods: {
    deleteTodo(id) {
      db.collection('todos').doc(id).delete()
    },
    addItem() {
      if (this.newTodo === "") return

      let todoRef = db.collection('todos').doc()
      const todoItem = {
        id: todoRef.id,
        todo: this.newTodo,
        isComplete: false
      }
      db.collection("todos").doc(todoRef.id).set(todoItem)
      .then(() => {
        this.newTodo = ""
      })
    },
    IsCompleteToggle(todo) {
      db.collection('todos').doc(todo.id).set({isComplete: !todo.isComplete, todo: todo.todo, id: todo.id})
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>