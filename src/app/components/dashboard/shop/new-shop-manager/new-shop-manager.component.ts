import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/interfaces/auth/request/login-request';
import { SignUpRequest } from 'src/app/core/interfaces/auth/request/sign-up-request';
import { AuthTokenService } from 'src/app/core/services/auth/auth-token.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ShopStorageService } from 'src/app/core/services/shop/shop-storage.service';

@Component({
  selector: 'app-new-shop-manager',
  templateUrl: './new-shop-manager.component.html',
  styleUrls: ['./new-shop-manager.component.scss'],
})
export class NewShopManagerComponent implements OnInit {
  paramsObj: any;
  email: string = '';
  shopId: string = '';
  shopManagerRegistrationForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private tokeService: AuthTokenService,
    private authService: AuthenticationService,
    private router: Router,
    private shopStorage: ShopStorageService
  ) {
    this.shopManagerRegistrationForm = fb.group({
      email: [this.email],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.paramsObj = { ...params.keys, ...params };
      this.email = this.paramsObj.params.email;
      this.shopId = this.paramsObj.params.id;
    });
  }

  register() {
    if (this.shopManagerRegistrationForm.valid) {
      const request = this.shopManagerRegistrationForm.value as SignUpRequest;
      const params = new HttpParams()
        .set('shopId', this.shopId)
        .set('email', this.email);
      this.authService.shopManagerRegistration(request, params).subscribe(
        (response) => {
          this.shopStorage.saveShopId(this.shopId);
          const loginRequest: LoginRequest = {
            email: request.email,
            password: request.password,
          };
          this.authService.login(loginRequest).subscribe(
            (response) => {
              this.tokeService.saveTokens(response);

              this.router.navigate(['dashboard']);
            },
            (error) => {
              this.router.navigate(['login']);
            }
          );
        },
        (error) => {}
      );
    }
  }
  ngOnInit(): void {}
}
