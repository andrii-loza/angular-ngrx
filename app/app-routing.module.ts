import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { App } from './app.component.ts';
import { Other } from './other.component.ts';

const routes: Routes = [
  { path: 'app', component: App },
  {path: 'other', component: Other},
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
