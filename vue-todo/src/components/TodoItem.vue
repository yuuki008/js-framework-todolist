<template>
  <div>
      <li style="display: flex">
        <div style="padding: 10px">
          <input type="checkbox" v-model="todo.isComplete" v-on:click="IsCompleteToggle(todo)">
        </div>
        <div style="padding: 10px">
        {{ todo.todo }}
        </div>
        <button style="margin: 10px" v-on:click="deleteTodo(todo.id)">delete</button>
        <button style="margin: 10px" v-on:click="edit=!edit" >edit</button>
        <div v-show="edit" style="margin: 10px" class='update__text'>
          <input type="text" v-model="updateText" :placeholder="todo.todo" >
          <button v-on:click="updateTodo(todo, updateText)">submit</button>
        </div>
      </li>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  name: 'TodoItem',
  data() {
    return {
      edit: false,
      updateText: "",
    }
  },
  props: {
    todo: {
      todo: String,
      id: String,
      isComplete: Boolean
    },
    IsCompleteToggle: Function,
    deleteTodo: Function
  },
  methods: {
    updateTodo(todo, text) {
      db.collection('todos').doc(todo.id).set({ todo: text }, { merge: true })
      .then(() => {
        this.edit = false
        this.updateText = ""
      })
    }
  }
}
</script>
