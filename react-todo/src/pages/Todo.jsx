import React, { useState, useEffect } from 'react'
import { Todolist } from '../components/Todolist'
import { Form } from '../components/Form'
import { listenAuthState } from '../fetch/index'
import { useHistory } from 'react-router-dom'
import { changeTodoType, updateTodo } from '../fetch/todo'

export const Todo = () => {
  const history = useHistory()

  const [todos, setTodos] = useState([])
  const [todoType, setTodoType] = useState('all')
  const [user, setUserData] = useState({})

  const getUserData = async () => {
    const data = await listenAuthState()
    if (!data) return history.push('/signin')
    setUserData(data)
  }

  const handleChangeTodoType = async () => {
    const todolist = await changeTodoType(todoType)
    setTodos(todolist)
  }

  useEffect(() => {
    handleChangeTodoType()
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
        <Form setTodoType={setTodoType} todoType={todoType} user={user} setTodos={setTodos}/>
        <Todolist todos={todos} user={user} setTodos={setTodos}/>
      </div>
    </div>
  )
}
