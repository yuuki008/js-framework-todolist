import React from 'react'
import { TodoItem } from './TodoItem'

export const Todolist = ({todos, user}) => {
  return (
    <ul>
      {todos && (
        todos.map((todo) =>
          <TodoItem key={todo.id} todo={todo} user={user}/>
        )
      )}
    </ul>
  )
}
