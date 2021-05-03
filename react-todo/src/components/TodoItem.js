import React, { useCallback, useState } from 'react'
import { isCompleteToggle, deleteTodo, updateTodo } from '../fetch/todo'

export const TodoItem = ({ todo, user }) => {
  const [text, setText] = useState("")
  const [edit, setEdit] = useState(false)

  const inputText = useCallback((event) => {
    setText(event.target.value)
  }, [setText])

  return (
    <div>
      <li style={{ display: 'flex' }}>
        <div style={{ padding: "10px" }}>
          <input
            type="checkbox"
            checked={todo.isComplete}
            onClick={() => isCompleteToggle(todo)}
          />
        </div>
        <div style={{ padding: '10px' }}>
          {todo.todo}
        </div>
        <button
          style={{ margin: '10px' }}
          onClick={() => deleteTodo(todo.id, user.id)}
        >
          delete
        </button>
        <button
          style={{ margin: '10px' }}
          onClick={() => setEdit(!edit)}
        >
          edit
        </button>
        {edit && (
          <div style={{ margin: '10px' }}>
            <input
              type="text"
              value={text}
              onChange={(event) => inputText(event)}
            />
            <button
              onClick={() => updateTodo(todo, text, setText, setEdit)}
            >
              submit
            </button>
          </div>
        )}
      </li>
    </div>
  )
}
