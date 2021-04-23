import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1); //retrieve the last user
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  setCurrentUser(user: User){
    this.currentUserSource.next(user)
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'accounts/register', model).pipe(
      map((response: User) => {
        if(response) {
          console.log(response);
          this.currentUserSource.next(response);
          localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
      })
    );
  }
}
