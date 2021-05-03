import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Product } from '../_models/product.model';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private currentProductSource = new ReplaySubject<Product>(1);
  _product$ = this.currentProductSource.asObservable();

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
}
