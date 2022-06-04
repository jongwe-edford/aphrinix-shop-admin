import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbStepperComponent } from '@nebular/theme';
import { NotifierService } from 'angular-notifier';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/core/interfaces/auth/request/login-request';
import { SignUpRequest } from 'src/app/core/interfaces/auth/request/sign-up-request';
import {
  AuthConstants,
  AuthTokenService,
} from 'src/app/core/services/auth/auth-token.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userAccountForm!: FormGroup;
  toastRef: any;
  @ViewChild('stepper') stepper!: NbStepperComponent;
  shopInfoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private tokenService: AuthTokenService,
    private notifier: ToastrService,
    private router: Router
  ) {
    console.log(AuthConstants.accessToken);
  }

  ngOnInit() {
    this.userAccountForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.shopInfoForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  public get firstname(): string {
    return this.userAccountForm.get('firstname')?.value;
  }
  public get lastname(): string {
    return this.userAccountForm.get('lastname')?.value;
  }
  public get email(): string {
    return this.userAccountForm.get('email')?.value;
  }
  public get password(): string {
    return this.userAccountForm.get('password')?.value;
  }

  onCreateAccount() {
    if (this.userAccountForm.valid) {
      const registrationRequest: SignUpRequest = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
      };
      this.authService.signUp(registrationRequest).subscribe(
        (response) => {
          console.log(response);
          const request: LoginRequest = {
            password: registrationRequest.password,
            email: registrationRequest.email,
          };
          this.authService.login(request).subscribe(
            (response) => {
              console.log(response);
              this.tokenService.saveTokens(response);
              console.log(
                'Access token:::==>',
                this.tokenService.accessToken()
              );
              console.log(
                'Refresh token:::==>',
                this.tokenService.refrshToken()
              );
              window.addEventListener('popstate', function (event) {
                console.log('popstate fired!');
                console.log('State ', event.state);
              });
              this.router.navigateByUrl('/dashboard');
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          const err = JSON.parse(error.error);
          console.log(err);
          this.notifier.error('error', err.message + '! You may login');
          console.log(err.message);
        }
      );
    }
  }
}
