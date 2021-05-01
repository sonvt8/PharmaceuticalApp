import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + "/accounts";


  resetList(){
    return this.http.get(this.baseUrl);
  }
}
