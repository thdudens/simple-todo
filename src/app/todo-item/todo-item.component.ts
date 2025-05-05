import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../todo/todo.model';
import { NgClass } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-item',
  imports: [
    NgClass,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() delete = new EventEmitter<String>();
  @Output() toggle = new EventEmitter<String>();

  onDelete() {
    this.delete.emit(this.todo.id);
  }

  onToggle() {
    this.toggle.emit(this.todo.id);
  }
}
