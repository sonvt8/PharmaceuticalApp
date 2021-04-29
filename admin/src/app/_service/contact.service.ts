import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + "/contacts";


  postContact(val: Contact){
    return this.http.post(this.baseUrl,val);
  }

  putContact(val: Contact){
    return this.http.put(`${this.baseUrl}/${val.id}`,val);
  }

  deleteContact(val: Contact){
    return this.http.delete(`${this.baseUrl}/${val.id}`);
  }

  resetList(){
    return this.http.get(this.baseUrl);
  }
}
