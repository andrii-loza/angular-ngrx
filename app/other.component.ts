import { Component, NgModule, OnDestroy, ViewChildren } from '@angular/core';
import { Store, Action, State, select } from '@ngrx/store';
import { reducers, getTodos, getCurrentFilter, getErrors, TodosState } from './reducers';
import { Todo } from './reducers/todo/todo.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-other',
  template: `
     <h1>Other Page</h1>

     <ul>
     Current todos:
        <li *ngFor="let todo of todos | async"
          [style.textDecoration]="todo.completed?'line-through':'none'">
          {{todo.text}}
        </li>
      </ul>
  `
})
export class Other {
  todos: Observable<Todo>;
  
  constructor(
    private _store: Store<TodosState>
  ) {
    this.todos = _store.select(getTodos);
    console.log(this.todos);
  }
}