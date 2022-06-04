import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../interfaces/auth/request/login-request';
import { SignUpRequest } from '../../interfaces/auth/request/sign-up-request';
import { LoginResponse } from '../../interfaces/auth/response/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authUrl = environment.serverUrl + 'shop/auth/';
  constructor(private httpClient: HttpClient) {}

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
}
