import { Component, NgModule, OnDestroy, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
     <h1>Main</h1>
     
     <ul>
      <li>
        <a routerLink="/app" routerLinkActive="active">App</a>
      </li>
      <li>
        <a routerLink="/other" routerLinkActive='active'>Other</a>
      </li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class Main {
  constructor() {}
}