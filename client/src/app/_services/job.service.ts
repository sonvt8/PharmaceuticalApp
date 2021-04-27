import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../_model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'http://localhost:22566/api/jobs';
  //formData: Job = new Job();

  list : Job[];

  postJob(val: Job){
    return this.http.post(this.baseUrl,val);
  }

  putJob(val: Job){
    return this.http.put(`${this.baseUrl}/${val.id}`,val);
  }

  deleteJob(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  resetList(){
    return this.http.get(this.baseUrl);
  }
  
}
