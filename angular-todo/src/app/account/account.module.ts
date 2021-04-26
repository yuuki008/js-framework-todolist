import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    // SharedModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }