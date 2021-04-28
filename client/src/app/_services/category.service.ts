import { Injectable,EventEmitter } from '@angular/core';
import { Category } from '../_models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // categorySelected = new EventEmitter<Category>();

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }
}
