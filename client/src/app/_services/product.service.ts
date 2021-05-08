import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Product } from '../_models/product.model';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private currentProductSource = new ReplaySubject<Product>(1);
  _product$ = this.currentProductSource.asObservable();
  paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();

  constructor(private readonly http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getProductsByCategoryId(id: number) {
    return this.http.get<Product[]>(`${environment.apiUrl}/products/categories/${id}`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`).pipe(
      map((response: Product) => {
        if(response) {
          this.currentProductSource.next(response);
          return response;
        }
      })
    );
  }

  resetList(id: number, page?: number, itemPerPage?: number, search?: string){
    let params = new HttpParams();

    if(page!==null && itemPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemPerPage.toString());
    }

    if(search!==""){
      params = params.append('search', search);
    }

    return this.http.get<any>(environment.apiUrl+'/products/pagination/categories/' + id, {observe: 'response', params}).pipe(
      map(response=>{
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination')!==null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }

  resetProductList(page?: number, itemPerPage?: number, search?: string){
    let params = new HttpParams();

    if(page!==null && itemPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemPerPage.toString());
    }

    if(search!==""){
      params = params.append('search', search);
    }

    return this.http.get<any>(environment.apiUrl+'/products/pagination', {observe: 'response', params}).pipe(
      map(response=>{
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination')!==null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }
}
