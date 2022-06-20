import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShopCreation } from '../../interfaces/shops/request/shop-creation';
import { AuthTokenService } from '../auth/auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  shopsUrl = environment.serverUrl + 'shops/';
  constructor(
    private httpClient: HttpClient,
    private tokenService: AuthTokenService
  ) {}

  createShop(request: ShopCreation): Observable<any> {
    return this.httpClient.post<any>(`${this.shopsUrl}/create`, request);
  }

  finShopByShopId(shopId: string): Observable<any> {
    console.log('Shop id ', shopId);

    return this.httpClient.get(`${this.shopsUrl}${shopId}`);
  }
  findShopByAdmin(): Observable<any> {
    const token = this.tokenService.accessToken();
    return this.httpClient.get(`${this.shopsUrl}admin/${token}`);
  }
  sendShopManagerRegistrationLink(
    email: string,
    shopId: string
  ): Observable<any> {
    const params = new HttpParams().set('email', email).set('id', shopId);

    return this.httpClient.get(`${this.shopsUrl}manager`, { params });
  }
}
