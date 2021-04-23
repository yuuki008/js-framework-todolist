<template>
  <div id="app">
    <h2>タスク</h2>
    <div>
      <input type="text" v-model="newTodoName">
      <button type="submit" v-on:click="createTodo()">タスク作成</button>
    </div>
    <ul>
      <li><button type="submit" v-on:click="showTodoType = 'all'">すべて</button></li>
      <li><button type="submit" v-on:click="showTodoType = 'active'">未完タスク一覧</button></li>
      <li><button type="submit" v-on:click="showTodoType = 'complete'">完了タスク一覧</button></li>
    </ul>
    <todos :todos="this.todos" :updateIsComplete="updateIsComplete" :updateTodo="updateTodo" :deleteTodo="deleteTodo" />
  </div>
</template>

<script>
import { db } from './main'
import Todos from './components/Todos.vue'

export default {
  components: {
    'todos': Todos
  },
  name: 'App',
  created: function() {
    this.db = db;
    this.db.collection('todos').onSnapshot(snapshots => {
      this.todos = []
      snapshots.forEach(snapshot => {
        this.todos.push(snapshot.data())
      })
    });
  },
  computed: {
    filteredTodos: function () {
      if (this.showTodoType == 'all') {
        return this.todos;
      } else {
        let showIsComplete = false;
        if (this.showTodoType == 'complete') { showIsComplete = true }
        let filterTodos = {};
        for (var key in this.todos) {
          let todo = this.todos[key];
          if (todo.isComplete == showIsComplete) { filterTodos[key] = todo; }
        }
        this.todos = filterTodos
      }
    }
  },
  methods: {
    createTodo: function() {
      if (this.newTodoName == "") return;
      const todoRef = this.db.collection('todos').doc()
      const todoId = todoRef.id
      this.db.collection('todos').doc(todoId).set({
        name: this.newTodoName,
        isComplete: false,
        id: todoId
      })
      this.newTodoName = "";
    },
    updateIsComplete(todo){
      todo.isComplete = !todo.isComplete
      this.db.collection('todos').doc(todo.id).delete();
    },
    deleteTodo(todo){
      this.db.collection('todos').doc(todo.id).delete()
    },
    updateTodo(todo, updateText){
      todo.name = updateText
      this.db.collection('todos').doc(todo.id).set(todo)
    }
  },

  data () {
    return {
      db: null,
      newTodoName: '',
      showTodoType: 'all',
      todos: []
    }
  }
}
</script>

<style>
* {
  list-style: none;
}
body {
  width: 500px;
  margin: 30px auto;
  text-align: start;
}
.todos {
  display: flex;
  padding: 10px;
}
</style>
