import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl;


  resetList(){
    return this.http.get(this.APIUrl+'/categories')
  }


  addCategory(val:Category){
    return this.http.post(this.APIUrl+'/categories',val);
  }

  updateCategory(val:Category){
    return this.http.put(this.APIUrl+'/categories/' + val.id, val);
  }

  deleteCategory(val:any){
    return this.http.delete(this.APIUrl+'/categories/'+ val.id);
  }
}
