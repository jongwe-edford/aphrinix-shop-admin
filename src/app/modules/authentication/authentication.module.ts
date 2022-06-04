import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from '../../components/authentication/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from '../../components/authentication/sign-up/sign-up.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [CommonModule, AuthenticationRoutingModule, SharedModule],
})
export class AuthenticationModule {}
