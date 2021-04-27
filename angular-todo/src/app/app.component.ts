import { Component } from '@angular/core';
import './index.css'

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Angular-todo';
}
