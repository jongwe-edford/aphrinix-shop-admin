import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from '../../interfaces/auth/response/login-response';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  encryptionDecryptionKey = '83b3c33d-915a-4550-a3f4-ac1be85bcd23'.substring(
    3,
    27
  );
  constructor(private cookieService: CookieService) {}

  saveTokens(loginResponse: LoginResponse): void {
    const encryptedAccessToken = CryptoJS.AES.encrypt(
      loginResponse.accessToken,
      this.encryptionDecryptionKey
    ).toString();
    const encryptedRefreshToken = CryptoJS.AES.encrypt(
      loginResponse.refreshToken,
      this.encryptionDecryptionKey
    ).toString();
    if (this.cookieService.check(AuthConstants.accessToken)) {
      this.cookieService.delete(AuthConstants.accessToken);
    }
    if (this.cookieService.check(AuthConstants.refreshToken)) {
      this.cookieService.delete(AuthConstants.refreshToken);
    }
    this.cookieService.set(AuthConstants.accessToken, encryptedAccessToken);
    this.cookieService.set(AuthConstants.refreshToken, encryptedRefreshToken);
  }

  accessToken(): string {
    return CryptoJS.AES.decrypt(
      this.cookieService.get(AuthConstants.accessToken),
      this.encryptionDecryptionKey
    ).toString(CryptoJS.enc.Utf8);
  }

  refrshToken(): string {
    return CryptoJS.AES.decrypt(
      this.cookieService.get(AuthConstants.refreshToken),
      this.encryptionDecryptionKey
    ).toString(CryptoJS.enc.Utf8);
  }
}

export class AuthConstants {
  public static accessToken = '83b3c33d-915a-4550-a3f4-ac1be85bcd23';
  public static refreshToken = 'c7e8a4fd-ca7f-41da-a5c6-5c3b57dbb641';
}
