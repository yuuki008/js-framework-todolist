import React from 'react'
import { TodoItem } from './TodoItem'

export const Todolist = ({todos, deleteTodo, updateTodo, isCompleteToggle}) => {
  return (
    <ul>
      {todos && (
        todos.map((todo) =>
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} isCompleteToggle={isCompleteToggle}/>
        )
      )}
    </ul>
  )
}
