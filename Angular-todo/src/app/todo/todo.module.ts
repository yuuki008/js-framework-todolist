import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';


@NgModule({
  imports: [
    CommonModule,
    TodoRoutingModule
  ],
  declarations: [
    TodoComponent,
    TodoItemComponent
  ]
})
export class TodoModule { }
