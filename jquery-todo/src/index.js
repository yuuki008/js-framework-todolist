import { db } from './db'
import $ from 'jquery'

$(document).ready(function () {
  $(".add-todo").on('click', function () {
    const inputVal = $(".todo-inputform").val()
      if (inputVal !== "") {
        addTodo(inputVal)
      }
  })


  $(".is-complete").on('click', function (e) {
    const type = e.target.id
    setTypeTodos(type)
  })

  $(".todo-list").on('click', '.delete-todo', function (e) {
    deleteTodo(e.target.id)
  })

  $(".todo-list").on('click', '.update-todo', function (e) {
    const inputVal = $(`.update${e.target.id}`).val()
    updateTodo(e.target.id, inputVal)
  })
  $(".todo-list").on('click', '.checkbox', function (e) {
    isCompleteToggle(e.target.id, e.target.checked)
  })

  $(".todo-list").on('click', '.edit-button', function (e) {
    $(`.${e.target.id}`).toggle()
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
  if(!id) return
  db.collection('todos').doc(id).set({
    isComplete: isComplete
  }, { merge: true })
}

const deleteTodo = (id) => {
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

const setTypeTodos = (type) => {
  if (type === 'all') {
    setTodos()
  } else {
    let IsComplete = false
    if (type === 'complete') IsComplete = true
    db.collection('todos').get()
    .then((snapshot) => {
      let todolist = []

      snapshot.docs.map((doc) => {
          const data = doc.data()
          if (data.isComplete === IsComplete) {
            todolist.push(data)
          }
      })

      setTodolistElement(todolist)
    })
  }
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
        <button style="margin: 10px" class="edit-button" id="${todo.id}">edit</button>
        <div style="margin: 10px" class="${todo.id}" >
          <input type="text" class="update${todo.id}">
          <button class="update-todo" id="${todo.id}">submit</button>
        </div>
      </li>`
    )
  })
}

setTodos()