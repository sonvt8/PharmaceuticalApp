import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl + "/categories";
  constructor(private http: HttpClient) { }

  postCategory(val: Category){
    return this.http.post(this.baseUrl,val);
  }

  putCategory(val: Category){
    return this.http.put(`${this.baseUrl}/${val.id}`,val);
  }

  deleteCategory(val: Category){
    return this.http.delete(`${this.baseUrl}/${val.id}`);
  }

  resetList(){
    return this.http.get(this.baseUrl);
  }
}
