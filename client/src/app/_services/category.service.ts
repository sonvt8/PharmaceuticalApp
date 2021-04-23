import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../_model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  readonly APIUrl = 'http://localhost:22566/api';

  getCateList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/categories');
  }

  getCate(val:any){
    return this.http.get<any>(this.APIUrl+'/categories/' + val.id);
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
