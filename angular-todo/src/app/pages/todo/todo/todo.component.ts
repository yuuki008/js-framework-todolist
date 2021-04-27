import { Component, Input, OnInit } from '@angular/core';
import { db } from '../../../../db';

interface Todo {
  todo: string,
  id: string,
  isComplete: boolean
}

type TodoType = "all" | 'active' | 'complete'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[];
  todo = ""
  todoType: TodoType = 'all'

  constructor() { }
  ngOnInit(): void {
    this.fetchTodo()
  }

  isCompleteToggle = (todo: Todo) => {
    console.log(todo)
    db.collection('todos').doc(todo.id).set({
      todo: todo.todo,
      id: todo.id,
      isComplete: !todo.isComplete
    })
  }

  deleteTodo = (id: string) => {
    db.collection('todos').doc(id).delete()
    .then(() => this.fetchTodo())
  }

  addTodo = () => {
    const ref = db.collection('todos').doc()
    console.log(this.todo)
    const todoId = ref.id
    db.collection('todos').doc(todoId).set({
      id: todoId,
      todo: this.todo,
      isComplete: false
    })
      .then(() => {
        const textForm:any = document.getElementById("todo-form")
        textForm.value = ""
        this.todo = ""
        this.fetchTodo()
    })
  }

  inputTodo = (text: string) => {
    this.todo = text
  }

  fetchTodo = () => {
    db.collection('todos').get()
      .then(snapshot => {
        let todolist = []
        snapshot.docs.forEach(doc => {
          const data = doc.data()
          todolist.push(data)
        })
        this.todos = todolist
    })
  }

  returnTodos = async () => {
    let todolist = []
    await db.collection('todos').get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const data = doc.data()
          todolist.push(data)
        })
      })
    return todolist
  }

  setTodoType = async (todoType: TodoType) => {
    if (todoType === "all") {
      this.fetchTodo()
    } else {
      let showIsComplete = false
      if (todoType === 'complete') { showIsComplete = true }
      const todolist = await this.returnTodos()
      const filterTodos = todolist.filter((todo: Todo) => todo.isComplete === showIsComplete)
      this.todos = filterTodos
    }
  }
}
