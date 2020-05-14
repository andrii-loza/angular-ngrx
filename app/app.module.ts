//our root app component
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module.ts';
import { StoreModule } from "@ngrx/store";
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { App } from './app.component';
import {Other} from './other.component';
import {Main} from "./main.component";
import { VisibleTodosPipe } from './visibleTodosPipe';

import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './reducers/todo/todo.effects';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects]),
    // StoreDevtoolsModule.instrument always after StoreModule
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  declarations: [App, VisibleTodosPipe,Other, Main],
  providers: [TodoEffects],
  bootstrap: [Main]
})
export class AppModule { }