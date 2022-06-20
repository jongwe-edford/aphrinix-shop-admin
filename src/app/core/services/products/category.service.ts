import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../interfaces/categories/response/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesApi = environment.serverUrl + 'categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesApi);
  }
}
