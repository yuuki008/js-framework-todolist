import { db } from '../db'

const todosRef = db.collection('todos')
const usersRef = db.collection('users')

export const todoPost = (userId, todo, setTodo) => {
  const ref = todosRef.doc()
  const todoId = ref.id
  todosRef.doc(todoId).set({
    userId,
    id: todoId,
    todo: todo,
    isComplete: false
  })
  .then(() => {
    setTodo('')
    usersRef.doc(userId).collection('todos').doc(todoId).set({ id: todoId })
  })
}

export const deleteTodo = (id, userId) => {
  todosRef.doc(id).delete()
  .then(() => {
    usersRef.doc(userId).collection('todos').doc(id).delete()
  })
}

export const isCompleteToggle = (todo) => {
  todosRef.doc(todo.id).set({ isComplete: !todo.isComplete }, { merge: true })
}

export const updateTodo = (todo, text, setText, setEdit) => {
  todosRef.doc(todo.id).set({ todo: text }, { merge: true })
  .then(() => {
    setText('')
    setEdit(false)
  })
}

export const changeTodoType = async (todoType) => {
  if (todoType === "all") {
    const todolist = await todosFetch()
    return todolist
  } else {
    let showIsComplete = false
    if (todoType === 'complete') { showIsComplete = true }
    const todolist = await todosFetch()
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