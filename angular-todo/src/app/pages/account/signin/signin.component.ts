import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../service/session.service';
import { Password } from '../../../class/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public account = new Password();

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  submitLogin(e: Event) {
    e.preventDefault();
    this.sessionService.login(this.account);
  }
}