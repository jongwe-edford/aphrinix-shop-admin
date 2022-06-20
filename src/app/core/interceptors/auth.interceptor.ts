import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthTokenService } from '../services/auth/auth-token.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private tokenService: AuthTokenService,
    private authServivce: AuthenticationService
  ) {}
  accessToken = this.tokenService.accessToken();
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.tokenService.accessToken();
    console.log(token);

    if (token != null) {
      authReq = this.addTokenHeader(request, token);
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          (!authReq.url.includes('/shop/auth/register') ||
            !authReq.url.includes('/shop/auth/login'))
        ) {
          console.log(authReq.url);

          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.refrshToken();
      console.log('refresh token ', token);

      if (token)
        return this.authServivce.refreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.tokenService.saveTokens(token);
            this.refreshTokenSubject.next(token.refreshToken);
            console.log('New Tken ', token);
            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    /* for Node.js Express back-end */
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
