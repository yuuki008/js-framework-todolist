import React, { useState, useEffect } from 'react'
import { db } from '../db'
import { Todolist } from '../components/Todolist'
import { Form } from '../components/Form'
import { listenAuthState } from '../fetch'
import { useHistory } from 'react-router-dom'

export const Todo = () => {
  const history = useHistory()

  const [todos, setTodos] = useState([])
  const [todoType, setTodoType] = useState('all')

  const deleteTodo = (id) => {
    db.collection('todos').doc(id).delete()
  }

  const isCompleteToggle = (todo) => {
    db.collection('todos').doc(todo.id).set({
      todo: todo.todo,
      id: todo.id,
      isComplete: !todo.isComplete
    })
  }

  const updateTodo = (todo, text, setText, setEdit) => {
    db.collection('todos').doc(todo.id).set({
      id: todo.id,
      todo: text,
      isComplete: todo.isComplete
    })
    .then(() => {
      setText('')
      setEdit(false)
    })
  }


  const todosFetch = async() => {
    let newTodos = []
    await db.collection('todos').get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const data = doc.data()
          newTodos.push(data)
        })
      })
    return newTodos
  }

  const changeTodoType = async () => {
    if (todoType === "all") {
      const todolist = await todosFetch()
      console.log(todolist)
      setTodos(todolist)
    } else {
      let showIsComplete = false
      if (todoType === 'complete') { showIsComplete = true }
      const todolist = await todosFetch()
      const filterTodos = todolist.filter(todo => todo.isComplete === showIsComplete)
      console.log(filterTodos)
      setTodos(filterTodos)
    }
  }

  const getUserData = async () => {
    const data = await listenAuthState()
    if (!data) return history.push('/signin')
  }

  useEffect(() => {
    changeTodoType()
  }, [todoType, updateTodo])

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <div>
        <h2>React ToDo</h2>
      </div>
      <div style={{ margin: "30px"}}>
        <Form setTodoType={setTodoType} todoType={todoType} />
        <Todolist todos={todos} deleteTodo={deleteTodo} isCompleteToggle={isCompleteToggle} updateTodo={updateTodo}/>
      </div>
    </div>
  )
}
