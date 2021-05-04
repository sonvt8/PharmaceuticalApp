import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Product } from '../_models/product';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly baseUrl = environment.apiUrl + '/products'
  paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();

  constructor(private http: HttpClient) { }
  //formData: Product = new Product();
  getProducts(){
    return this.http.get(this.baseUrl);
  }

  postProduct(val: Product){
    return this.http.post(this.baseUrl,val);
  }

  putProduct(val: Product){
    return this.http.put(`${this.baseUrl}/${val.id}`,val);
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  resetList(page?: number, itemPerPage?: number, search?: string){
    let params = new HttpParams();

    if(page!==null && itemPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemPerPage.toString());
    }

    if(search!==""){
      params = params.append('search', search);
    }

    return this.http.get<any>(this.baseUrl+'/pagination', {observe: 'response', params}).pipe(
      map(response=>{
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination')!==null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }

  setMainPhoto(photoId: number, id: number) {
    // let params = new HttpParams();
    // params = params.append('id', id.toString())
    
    return this.http.put(this.baseUrl + '/set-main-photo/' + photoId + '?' + 'id=' + id,{});
  }

  deletePhoto(photoId: number, id: number) {
    let params = new HttpParams();
    if(id!==null){
      params = params.append('id', id.toString())
    }
    return this.http.delete(this.baseUrl + '/delete-photo/' + photoId, {params});
  }
}
