import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + "/jobs";


  postJob(val: Job){
    return this.http.post(this.baseUrl,val);
  }

  putJob(val: Job){
    return this.http.put(`${this.baseUrl}/${val.id}`,val);
  }

  deleteJob(val: Job){
    return this.http.delete(`${this.baseUrl}/${val.id}`);
  }

  resetList(){
    return this.http.get(this.baseUrl);
  }
}
