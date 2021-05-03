import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact';
import { map} from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + "/contacts";
  paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();


  postContact(val: Contact){
    return this.http.post(this.baseUrl,val);
  }

  putContact(val: Contact){
    return this.http.put(`${this.baseUrl}/${val.id}`,val);
  }

  deleteContact(val: Contact){
    return this.http.delete(`${this.baseUrl}/${val.id}`);
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
}
