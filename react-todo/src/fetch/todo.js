import { db } from '../db'

const todosRef = db.collection('todos')
const usersRef = db.collection('users')

export const todoPost = (userId, todo, setTodo, setTodos) => {
  const ref = todosRef.doc()
  const todoId = ref.id
  todosRef.doc(todoId).set({
    userId,
    id: todoId,
    todo: todo,
    isComplete: false
  })
  .then(async() => {
    setTodo('')
    const newTodos = await todosFetch()
    setTodos(newTodos)
    usersRef.doc(userId).collection('todos').doc(todoId).set({ id: todoId })
  })
}

export const deleteTodo = (id, userId, setTodos) => {
  todosRef.doc(id).delete()
  .then(async() => {
    usersRef.doc(userId).collection('todos').doc(id).delete()
    const newTodos = await todosFetch()
    setTodos(newTodos)
  })
}

export const isCompleteToggle = (todo, setTodos) => {
  todosRef.doc(todo.id).set({ isComplete: !todo.isComplete }, { merge: true })
  .then(async () => {
      const newTodos = await todosFetch()
      setTodos(newTodos)
  })
}

export const updateTodo = (todo, text, setText, setEdit, setTodos) => {
  todosRef.doc(todo.id).set({ todo: text }, { merge: true })
    .then(async() => {
    const newTodos = await todosFetch()
    setTodos(newTodos)
    setText('')
    setEdit(false)
  })
}

export const changeTodoType = async (todoType) => {
  const todolist = await todosFetch()
  if (todoType === "all") {
    return todolist
  } else {
    let showIsComplete = false
    if (todoType === 'complete') { showIsComplete = true }
    const filterTodos = todolist.filter(todo => todo.isComplete === showIsComplete)
    return filterTodos
  }
}

export const todosFetch = async() => {
  let newTodos = []
  await todosRef.get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        const data = doc.data()
        newTodos.push(data)
      })
    })
  return newTodos
}