import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShopManager } from '../../interfaces/shops/response/shop-manager';

@Injectable({
  providedIn: 'root',
})
export class ShopManagerService {
  apiUrl = environment.serverUrl + 'manager/';
  constructor(private http: HttpClient) {}

  shopManagerList(shopId: string): Observable<ShopManager[]> {
    return this.http.get<ShopManager[]>(`${this.apiUrl}list/${shopId}`);
  }
}
