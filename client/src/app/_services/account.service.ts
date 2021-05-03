import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';
import { resetPassword } from 'src/app/_models/resetPassword.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/accounts/login`, user)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/accounts/register`, user).pipe(
      map((response: User) => {
        if (response) {
          this.userSubject.next(response);
          localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
      })
    );
  }

  sendTokenToEmail(resetPassword: resetPassword) {
    return this.http.post(`${environment.apiUrl}/accounts/recovery_email`, resetPassword).pipe(
      map((response: resetPassword) => {
        if (response) {
          localStorage.setItem('recoveryPassword', JSON.stringify(response));
        }
        return response;
      })
    );
  }

  resetPassword(resetPassword: resetPassword) {
    return this.http.post(`${environment.apiUrl}/accounts/recovery_password`, resetPassword).pipe(
      map((response: string) => {
        return response;
      })
    );
  }
}