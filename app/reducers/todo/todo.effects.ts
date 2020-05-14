import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, timer, of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { AddTodo, TodoActionTypes, AddTodoEffect, TodoActions } from './todo.actions';
import { ErrorsActionTypes, SetError, ErrorsActions } from '../errors/errors.actions';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions
  ) { }

  @Effect()
  addTodoAsync$ = this.actions$
    .ofType<TodoActions>(TodoActionTypes.AddTodoEffect).pipe(
    mergeMap(action => timer(2000).pipe(
      tap(() => {
        throw (new Error(`${action.payload.text} failed`))
      }),
      //map(() => {
      //return new AddTodo(action.payload);
      //}),
      catchError(error => of(new SetError({ error })))
    ))
   )
}