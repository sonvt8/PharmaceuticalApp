import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Candidate } from '../_models/candidate';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + "/candidates";
  paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();
  FileUrl = 'http://localhost:22566/Resources/Resumes'

  getCandidate(){
    return this.http.get(this.baseUrl);
  }

  postCandidate(val: Candidate){
    return this.http.post(this.baseUrl,val);
  }

  putCandidate(val: Candidate){
    return this.http.put(`${this.baseUrl}/${val.id}`,val);
  }

  deleteCandidate(val: Candidate){
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
