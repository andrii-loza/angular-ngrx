import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { Todos, Todo } from './todo/todo.model';
import * as todos from './todo/todo.reducer';
import { Filter } from './filter/filter.model';
import * as currentFilter from './filter/filter.reducer';
import { select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as errors from './errors/errors.reducer';
import { Errors } from './errors/errors.model';

export interface TodosState extends Todos, Filter, Errors { }

export const reducers: ActionReducerMap<TodosState> = {
  todos: todos.reducer,
  currentFilter: currentFilter.reducer,
  errors: errors.reducer
};

export const metaReducers: MetaReducer<TodosState>[] = [];

export const selectTodos = (state: TodosState) => state.todos;
export const selectCurrentFilter = (state: TodosState) => state.currentFilter;

export const getFilteredTodos = createSelector(
  selectTodos,
  selectCurrentFilter,
  getVisibleTodos
); 

function getVisibleTodos(todos: Array<Todo>, filter: string) {
  console.log("Doing calculations...");
  debugger;
  if (!todos || !filter) return;
  let t = todos.slice().reverse();
  switch (filter) {
    case 'SHOW_ACTIVE':
      return t.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return t.filter(t => t.completed);
    case 'SHOW_ALL':
    default:
      return t;
  }
};


// before v5
// export const getTodos = state$ => state$.select(s => s.todos); 
// export const getCurrentFilter = state$ => state$.select('currentFilter'); 

export const getTodos = s => s.todos; 
export const getCurrentFilter = s => s.currentFilter; 
export const getErrors = s => s.errors;

/*
import { ActionReducerMap, select } from '@ngrx/store';
import * as TodoActions from './todoActions';
import { Action } from '@ngrx/store';
import { Todo, TodoAction, FilterAction, Todos, ErrorAction, TodosState } from './models';
*/