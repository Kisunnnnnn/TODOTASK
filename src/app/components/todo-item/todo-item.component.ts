import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  // set dynamic classes

  // tslint:disable-next-line:typedef
  setClass() {
    const classes = {
      todo: true,
      iscomplete: this.todo.completed,
    };

    return classes;
  }

  // tslint:disable-next-line:typedef
  onToggle(todo) {
    // console.log('toggle');
    // Toggle in UI
    todo.completed = !todo.completed;

    // Toggle on Server
    // tslint:disable-next-line:no-shadowed-variable
    this.todoService.toggleCompleted(todo).subscribe((todo) => {
      console.log(todo);
    });
  }

  // tslint:disable-next-line:typedef
  onDelete(todo) {
    // console.log('Delete');
    this.deleteTodo.emit(todo);
  }
}
