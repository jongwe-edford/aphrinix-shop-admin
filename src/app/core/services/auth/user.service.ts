import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api = environment.serverUrl + 'shop/auth/';
  constructor(private http: HttpClient) {}

  updateProfilePicture(email: string, file: File): Observable<HttpEvent<any>> {
    const params = new HttpParams().set('email', email);
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest('POST', `${this.api}update`, formData, {
      reportProgress: true,
      responseType: 'json',
      params: params,
    });
    return this.http.request(request);
  }
}
