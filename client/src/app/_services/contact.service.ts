import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = 'http://localhost:22566/api';

  getContactList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/contacts');
  }

  getContact(val:any){
    return this.http.get<any>(this.APIUrl+'/contacts/' + val.id);
  }

  addContact(val:any){
    return this.http.post(this.APIUrl+'/contacts',val);
  }

  updateContact(val:any){
    return this.http.put(this.APIUrl+'/contacts/' + val.id, val);
  }

  deleteContact(val:any){
    return this.http.delete(this.APIUrl+'/contacts/'+ val.id);
  }
}
