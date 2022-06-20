import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../interfaces/auth/request/login-request';
import { SignUpRequest } from '../../interfaces/auth/request/sign-up-request';
import { LoginResponse } from '../../interfaces/auth/response/login-response';
import { User } from '../../interfaces/auth/response/user';
import { ShopStorageService } from '../shop/shop-storage.service';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authUrl = environment.serverUrl + 'shop/auth/';
  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: AuthTokenService,
    private shopStorage: ShopStorageService
  ) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${this.authUrl}login`,
      loginRequest,
      { responseType: 'json' }
    );
  }

  signUp(signUpRequest: SignUpRequest): Observable<string> {
    return this.httpClient.post<string>(
      `${this.authUrl}register`,
      signUpRequest,
      { responseType: 'text' as 'json' }
    );
  }

  shopManagerRegistration(
    signUpRequest: SignUpRequest,
    params: HttpParams
  ): Observable<string> {
    return this.httpClient.post<string>(
      `${this.authUrl}register/manager`,
      signUpRequest,
      { params, responseType: 'text' as 'json' }
    );
  }
  currentUser(): Observable<User> {
    const params = new HttpParams().set(
      'token',
      this.tokenStorageService.accessToken()
    );
    return this.httpClient.get<User>(`${this.authUrl}u`, { params });
  }

  refreshToken(): Observable<LoginResponse> {
    const params = new HttpParams().set(
      'token',
      this.tokenStorageService.refrshToken()
    );
    return this.httpClient.post<LoginResponse>(
      `${this.authUrl}refresh?token=${this.tokenStorageService.refrshToken()}`,
      null
    );
  }
}
