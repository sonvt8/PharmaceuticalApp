import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { PaginatedResult } from '../_model/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly APIUrl = 'http://localhost:22566/api';
  paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();

  constructor(private http: HttpClient) { }

  getProducts():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/products');
  }

  getProductList(page?: number, itemPerPage?: number, search?: string){
    let params = new HttpParams();

    if(page!==null && itemPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemPerPage.toString());
    }

    if(search!==""){
      params = params.append('search', search);
    }

    return this.http.get<any>(this.APIUrl+'/products/pagination', {observe: 'response', params}).pipe(
      map(response=>{
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination')!==null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
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

  getCategoryNames(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/products/categories/' + val.categoryId);
  }
}
