import { Component } from '@angular/core';
import { Todo } from './todo.model';
import * as uuid from 'uuid';
import { NgFor, NgIf } from '@angular/common';
import { TodoItemComponent } from '../app/todo-item/todo-item.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatList } from '@angular/material/list';
import { MatCard } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  imports: [NgFor, NgIf, TodoItemComponent, MatSnackBarModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatCard, MatList, MatInputModule, MatButtonModule]
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodoTitle = new FormControl('', Validators.minLength(3));
  private lastDeleted: Todo[] = [];

  constructor(private snackBar: MatSnackBar) {}

  addTodo() {
    if (this.newTodoTitle.valid && this.newTodoTitle.value) {
      this.todos.push({
        id: uuid.v4().toString(),
        title: this.newTodoTitle.value,
        completed: false
      });
      this.newTodoTitle.reset();
    }
  }

  deleteTodo(id: String) {
    this.todos.splice(this.todos.findIndex(todo => {todo.id == id}), 1)
  }
  
  toggleTodo(id: String) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  }

  get selectedTodos() {
    return this.todos.filter(todo => todo.completed);
  }
  
  get hasSelection() {
    return this.selectedTodos.length > 0;
  }

  markSelectedAsIncomplete() {
    this.todos = this.todos.map(todo =>
      todo.completed ? { ...todo, completed: false } : todo
    );
  }
  
    deleteSelectedTodos() {
    this.lastDeleted = this.todos.filter(todo => todo.completed);
    this.todos = this.todos.filter(todo => !todo.completed);

    const snackBarRef = this.snackBar.open(
        `${this.lastDeleted.length} Todo(s) gelöscht`,
        'Rückgängig',
        { duration: 5000 }
    );

    snackBarRef.onAction().subscribe(() => {
        this.todos.push(...this.lastDeleted);
        this.lastDeleted = [];
    });
    }
  
}
