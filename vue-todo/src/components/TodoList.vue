<template>
  <div style="margin: 30px">
    <div style="display: column">
      <div style="display: flex" >
        <input type="text" style="height: 20px;" v-model="newTodo">
        <button type="submit" style="height: 25px" v-on:click="addItem()">Add</button>
      </div>
      <ul style="display: flex; list-style: none; padding: 0;">
        <li><button type="submit" v-on:click="showTodoType = 'all'">すべて</button></li>
        <li><button type="submit" v-on:click="showTodoType = 'active'">未完タスク一覧</button></li>
        <li><button type="submit" v-on:click="showTodoType = 'complete'">完了タスク一覧</button></li>
      </ul>
    </div>
    <ul max-width="400" style="padding: 0;" v-for="todo in filterTodo" :key="todo.id">
      <todo-item :todo="todo" :IsCompleteToggle="IsCompleteToggle" :deleteTodo="deleteTodo" />
    </ul>
  </div>
</template>
<script>
import { db } from '../db'
import TodoItem from './TodoItem'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      showTodoType: 'all'
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
  computed: {
    filterTodo: function() {
      if(this.showTodoType == "all") {
        return this.todos
      } else {
        let showIsComplete = false;
        if(this.showTodoType == 'complete') { showIsComplete = true }
        let filterTodos = {};
        for(let key in this.todos) {
          let todo = this.todos[key];
          if(todo.isComplete == showIsComplete) { filterTodos[key] = todo; }
        }
        return filterTodos;
      }
    }
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