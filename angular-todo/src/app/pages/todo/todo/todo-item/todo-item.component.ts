import { Component, Input, OnInit } from '@angular/core';
import { db } from 'src/db';

interface Todo {
  todo: string,
  id: string
  isComplete: boolean
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {

  @Input() todo: Todo
  @Input() isCompleteToggle: (todo: Todo) => void
  @Input() deleteTodo: (id: String) => void
  @Input() fetchTodo: () => void

  updateText = ""
  edit = false

  constructor() { }
  ngOnInit(): void {
  }

  inputUpdateTodo = (text: string) => {
    this.updateText = text
  }

  updateTodo = (todo) => {
    db.collection('todos').doc(todo.id).set({
      isComplete: todo.isComplete,
      todo: this.updateText,
      id: todo.id
    })
      .then(() => {
        const updateTextForm: any = document.getElementById("update-todo-form")
        updateTextForm.value = ""
        this.updateText = ""
        this.edit = false
        this.fetchTodo()
    })
  }
}
