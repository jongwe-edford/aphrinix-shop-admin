import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '../services/auth/auth-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: AuthTokenService) {}
  accessToken = this.tokenService.accessToken() + 'hshs';
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
    console.log('Headers:: ', request.headers);

    return next.handle(request);
  }
}
