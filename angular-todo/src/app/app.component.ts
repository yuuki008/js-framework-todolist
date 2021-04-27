import { Component } from '@angular/core';
import { SessionService } from './service/session.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./index.css']
})
export class AppComponent {
  constructor(private session: SessionService) {
    this.session.checkLogin();
  }
}
