import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../_model/category.model';
import { Product } from '../_model/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  list : Category[]

  readonly APIUrl = 'http://localhost:22566/api';

  getCateList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/categories');
  }

  resetList(){
    this.http.get(this.APIUrl+'/categories')
    .toPromise()
    .then(res=>this.list = res as Category[]);
  }

  getCate(val: Product){
    return this.http.get<any>(this.APIUrl+'/categories/' + val.categoryId);
  }

  addCategory(val:any){
    return this.http.post(this.APIUrl+'/categories',val);
  }

  updateCategory(val:any){
    return this.http.put(this.APIUrl+'/categories/' + val.id, val);
  }

  deleteCategory(val:any){
    return this.http.delete(this.APIUrl+'/categories/'+ val.id);
  }

}
