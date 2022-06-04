import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class ShopStorageService {
  shopStatusKey = 'X-915a-4550-83b3c33d';
  encryptionDecryptionKey =
    '83b3c33d-915a-4550-83b3c33d-f4-ac1be85bcd23'.substring(3, 27);
  constructor(private cookieService: CookieService) {}

  createShop() {
    const encryptedShopCreationStatus = CryptoJS.AES.encrypt(
      'true',
      this.encryptionDecryptionKey
    ).toString();

    if (this.cookieService.check(this.shopStatusKey)) {
      this.cookieService.delete(this.shopStatusKey);
    }
    this.cookieService.set(this.shopStatusKey, encryptedShopCreationStatus);
  }

  isShopCreated(): Boolean {
    const key = CryptoJS.AES.decrypt(
      this.cookieService.get(this.shopStatusKey),
      this.encryptionDecryptionKey
    ).toString(CryptoJS.enc.Utf8);
    return key === 'true';
  }
}
