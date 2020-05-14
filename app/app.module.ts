//our root app component
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from "@ngrx/store";
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { App } from './app.component';
import { VisibleTodosPipe } from './visibleTodosPipe';

import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './reducers/todo/todo.effects';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects]),
    // StoreDevtoolsModule.instrument always after StoreModule
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  declarations: [App, VisibleTodosPipe],
  providers: [TodoEffects],
  bootstrap: [App]
})
export class AppModule { }