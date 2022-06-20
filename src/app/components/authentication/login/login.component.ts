import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth';
import { NbStepperComponent } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/core/interfaces/auth/request/login-request';
import { AuthTokenService } from 'src/app/core/services/auth/auth-token.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
  ) {}
  ngOnInit(): void {
    this.userAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public get email(): string {
    return this.userAccountForm.get('email')?.value;
  }
  public get password(): string {
    return this.userAccountForm.get('password')?.value;
  }

  onCreateAccount() {
    if (this.userAccountForm.valid) {
      const request: LoginRequest = {
        password: this.password,
        email: this.email,
      };

      console.log(request);

      this.authService.login(request).subscribe(
        (response) => {
          console.log(response);
          this.tokenService.saveTokens(response);
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
