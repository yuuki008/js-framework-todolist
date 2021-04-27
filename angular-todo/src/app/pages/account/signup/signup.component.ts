import { Component, OnInit } from '@angular/core';
import { Password } from '../../../class/user';
import { SessionService } from '../../../service/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public account = new Password();

  constructor(private session: SessionService) {}

  ngOnInit(): void {
  }

  submitSignUp(e: Event): void {
    e.preventDefault();
    if (this.account.password !== this.account.passwordConfirmation) {
      alert('パスワードが異なります。');
      return;
    }
    this.session.signup(this.account);
  }
}