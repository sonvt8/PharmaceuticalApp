import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeedBack } from '../_models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + "/feedbacks";


  postContact(val: FeedBack){
    return this.http.post(this.baseUrl,val);
  }

  putContact(val: FeedBack){
    return this.http.put(`${this.baseUrl}/${val.id}`,val);
  }

  deleteContact(val: FeedBack){
    return this.http.delete(`${this.baseUrl}/${val.id}`);
  }

  resetList(){
    return this.http.get(this.baseUrl);
  }
}
