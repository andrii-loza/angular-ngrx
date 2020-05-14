import { Component, NgModule, OnDestroy, ViewChildren } from '@angular/core';
import { Store, Action, State, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { reducers, getTodos, getCurrentFilter, getErrors, TodosState } from './reducers';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { Todo } from './reducers/todo/todo.model';
import { BaseError } from './reducers/errors/errors.model';
import * as fromTodos from './reducers/todo/todo.actions';
import * as fromFilter from './reducers/filter/filter.actions';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <div>
        <input #todo (keydown.enter)="addTodo(todo)">
        <button (click)="addTodo(todo)">Add todo</button>
        <button (click)="addTodoAsync(todo)">Add todo (async)</button>
      </div>
      <ul>
        <li *ngFor="let todo of todos | async | visibleTodos:currentFilter" (click)="onTodoClick(todo.id)"
          [style.textDecoration]="todo.completed?'line-through':'none'">
          {{todo.text}} <a href="#" (click)="removeTodo(todo.id)">x</a>
        </li>
      </ul>
      <p>Show: 
        <a href="#" 
          (click)="applyFilter('SHOW_ALL');"
          [ngClass]="{'active': currentFilter==='SHOW_ALL', 'inactive': currentFilter!='SHOW_ALL'}">All</a>&nbsp;
        <a href="#" 
          (click)="applyFilter('SHOW_ACTIVE');"
          [ngClass]="{'active': currentFilter==='SHOW_ACTIVE', 'inactive': currentFilter!='SHOW_ACTIVE'}">Active</a>&nbsp; 
        <a href="#" 
          (click)="applyFilter('SHOW_COMPLETED');"
          [ngClass]="{'active': currentFilter==='SHOW_COMPLETED', 'inactive': currentFilter!='SHOW_COMPLETED'}">Completed</a>
      </p>
      <div *ngFor="let error of errors | async">{{error.message}}</div>
    </div>
  `,
})
export class App implements OnDestroy {
  currentFilter;
  todos: Observable<Todo>;
  errors: Observable<Array<BaseError>>;

  constructor(
    private _store: Store<TodosState>
  ) {
    this.todos = _store.select(getTodos);
    _store.select(getCurrentFilter)
      .subscribe(filter => {
        this.currentFilter = filter;
      });
    this.errors = _store.select(getErrors);
  }

  private addTodo(input) {
    if (input.value.length === 0) return;
    this._store.dispatch(
      new fromTodos.AddTodo(
        <Todo>{ text: input.value, completed: false }
      )
    );
    input.value = '';
  }

  private addTodoAsync(input) {
    this._store.dispatch(
      new fromTodos.AddTodoEffect(
        <Todo>{ text: input.value, completed: false }
      )
    );
    input.value = '';
  }

  private onTodoClick(id) {
    this._store.dispatch(
      new fromTodos.ToggleTodo(<Todo>{ id })
    );
  }
  private removeTodo(id) {
    this._store.dispatch(
      new fromTodos.DeleteTodo(<Todo>{ id })
    );
  }

  private applyFilter(filter) {
    this._store.dispatch(
      new fromFilter.SetCurrentFilter({ filter })
    );
  }

  public ngOnDestroy() {
    this.todos.unsubscribe();
  }
}