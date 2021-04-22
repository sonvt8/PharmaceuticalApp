import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../_model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:22566/api/categories';

  formData: Category = new Category();

  list : Category[];

  postCategory(){
    return this.http.post(this.baseURL,this.formData);
  }

  putCategory(){
    return this.http.put(`${this.baseURL}/${this.formData.id}`,this.formData);
  }

  deleteCategory(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  resetList(){
    return this.http.get(this.baseURL);
  }

}
