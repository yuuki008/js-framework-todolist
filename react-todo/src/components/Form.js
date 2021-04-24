import React, { useState, useCallback } from 'react'
import { db } from '../db'

export const Form = ({ setTodoType, todoType }) => {
  const [todo, setTodo] = useState('')

  const inputTodo = useCallback((event) => {
    setTodo(event.target.value)
  }, [setTodo])

  const todoPost = () => {
    const ref = db.collection('todos').doc()
    const todoId = ref.id
    db.collection('todos').doc(todoId).set({
      id: todoId,
      todo: todo,
      isComplete: false
    })
    .then(() => {
      setTodo('')
    })
  }

  return (
    <div style={{ display: 'column' }}>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={todo}
          onChange={(event) => inputTodo(event)}
        />
        <button
          type="submit"
          style={{ height:'25px' }}
          onClick={() => todoPost()}
        >
          Add
        </button>
      </div>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li>
          <button
            type="submit"
            onClick={() => setTodoType('all')}
          >
            すべて
          </button>
        </li>
        <li>
          <button
            type="submit"
            onClick={() => setTodoType('active')}
          >
            未完了タスク
          </button>
        </li>
        <li>
          <button
            type="submit"
            onClick={() => setTodoType('complete')}
          >
            完了タスク
          </button>
        </li>
        <li style={{ height: "25px", paddingLeft: "10px" }}>
          <h3 style={{ margin: 0, padding: 0 }}>
            {todoType === 'all' && 'すべて'}
            {todoType === 'active' && '未完了'}
            {todoType === 'complete' && '完了'}
          </h3>
        </li>
      </ul>
    </div>
  )
}
