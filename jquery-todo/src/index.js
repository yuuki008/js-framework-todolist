import { db } from './db'
import $ from 'jquery'

$(document).ready(function () {
  $(".add-todo").on('click', function () {
    const inputVal = $(".todo-inputform").val()
      if (inputVal !== "") {
        addTodo(inputVal)
      }
  })
  $(".todo-list").on('click', '.delete-todo', function (e) {
    deleteTodo(e.target.id)
  })

  $(".todo-list").on('click', '.update-todo', function (e) {
    console.log(e.target)
    const inputVal = $(`.update${e.target.id}`).val()
    updateTodo(e.target.id, inputVal)
  })
  $(".todo-list").on('click', '.checkbox', function (e) {
    console.log(e.target.id)
    isCompleteToggle(e.target.id, e.target.checked)
  })
})

const addTodo = (todo) => {
  console.log("add")
  const ref = db.collection('todos').doc()
  const id = ref.id
  db.collection('todos').doc(id).set({
    id: id,
    todo: todo,
    isComplete: false
  })
    .then(() => {
      $(".todo-inputform").val("")
      setTodos()
  })
}

const isCompleteToggle = (id, isComplete) => {
  console.log('toggle')
  if(!id) return
  db.collection('todos').doc(id).set({
    isComplete: isComplete
  }, { merge: true })
}

const deleteTodo = (id) => {
  console.log("delete")
  db.collection('todos').doc(id).delete()
  .then(() => {
    setTodos()
  })
}

const updateTodo = (id, inputVal) => {
  if(!id) return
  db.collection('todos').doc(id).set({
    todo: inputVal
  }, { merge: true })
    .then(() => {
      $(`.update${id}`).val("")
      setTodos()
  })
}

const setTodos = async () => {
  let todolist = []
  await db.collection('todos').get()
    .then(snapshot => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data()
        todolist.push(data)
    })
    })
  setTodolistElement(todolist)
}

const setTodolistElement = (todolist) => {
  $('.todo-list').empty()
  todolist.map(todo => {
    $(".todo-list").append(
      `<li style="display: flex">
        <div style="padding: 10px">
          <input type="checkbox" class="checkbox" id="${todo.id}" value=${todo.isComplete}>
        </div>
        <div style="padding: 10px">
          ${todo.todo}
        </div>
        <button style="margin: 10px" id="${todo.id}" class="delete-todo">delete</button>
        <button style="margin: 10px">edit</button>
        <div style="margin: 10px" class='update__text' >
          <input type="text" class="update${todo.id}">
          <button class="update-todo" id="${todo.id}">submit</button>
        </div>
      </li>`
    )
  })
}

setTodos()