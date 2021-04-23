
<template>
    <div class="todolist">
        <input class="toggle" type="checkbox" v-model="todo.isComplete" v-on:click="updateIsComplete(todo)">
        <div class="todo__text">{{todo.name}}</div>
        <!-- <button v-on:click="deleteTodo(todo)">X</button>
        <button v-on:click="update=!update">編集</button>
        <div v-show="update" id="update" class="update__text">
            <input type="text" v-model="todo.name" placeholder="update todo">
            <button
            v-on:click="updateTodo(todo.name, todo)"
            >完了</button>
        </div> -->
    </div>
</template>

<script>
export default  {
  name: 'TodoItem',
  props: ['todo', 'updateIsComplete', 'deleteTodo', 'updateIsComplete'],
  data(){
    return{
      updateText: "",
      update: false,
    }
  },
}