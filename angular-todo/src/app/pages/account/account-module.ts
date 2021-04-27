import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    SharedModule,
    AccountRoutingModule,
  ]
})
export class AccountModule {
}