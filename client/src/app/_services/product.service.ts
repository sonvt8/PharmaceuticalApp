import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  readonly APIUrl = 'http://localhost:22566/api';

  getProductList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/products');
  }

  addProduct(val:any){
    return this.http.post(this.APIUrl+'/products',val);
  }

  updateProduct(val:any){
    return this.http.put(this.APIUrl+'/products/' + val.id, val);
  }

  deleteProduct(val:any){
    return this.http.delete(this.APIUrl+'/products/'+ val.id);
  }
}
