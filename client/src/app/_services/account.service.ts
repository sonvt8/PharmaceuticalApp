import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';
import { resetPassword } from 'src/app/_models/resetPassword.model';
import { ChangePassword } from '../_models/changePassword.model';
import { UserFeedback } from '../_models/userFeedback.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  baseUrl = environment.apiUrl + "/accounts";

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

  getUserFeedBack(){
    return this.http.get(this.baseUrl);
  }

  login(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/accounts/login`, user)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify({
          "fullName": user.fullName,
          "email": user.email,
          "gender": user.gender,
          "phoneNumber": user.phoneNumber,
          "streetAddress": user.streetAddress,
          "state": user.state,
          "zip": user.zip,
          "country": user.country,
          "city": user.city,
          "photoUserUrl": user.photoUserUrl,
          "photoUserId": user.photoUserId
        }));
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
          localStorage.setItem('user', JSON.stringify({
            "fullName": response.fullName,
            "email": response.email,
            "gender": response.gender,
            "phoneNumber": response.phoneNumber,
            "streetAddress": response.streetAddress,
            "state": response.state,
            "zip": response.zip,
            "country": response.country,
            "city": response.city,
            "photoUserUrl": response.photoUserUrl
          }));
        }
        return response;
      })
    );
  }

  update(user: User) {
    return this.http.post(`${environment.apiUrl}/accounts`, user).pipe(
      map((response: User) => {
        if (response) {
          this.userSubject.next(response);
          localStorage.setItem('user', JSON.stringify({
            "fullName": response.fullName,
            "email": response.email,
            "gender": response.gender,
            "phoneNumber": response.phoneNumber,
            "streetAddress": response.streetAddress,
            "state": response.state,
            "zip": response.zip,
            "country": response.country,
            "city": response.city,
            "photoUserUrl": response.photoUserUrl
          }));
        }
        return response;
      })
    );
  }

  uploadProfileImage(form: FormData) {
    return this.http.post(`${environment.apiUrl}/accounts/add-photo`, form).pipe(
      map((response: any) => {
        if (response) {
          var existing = localStorage.getItem('user');
          existing = existing ? JSON.parse(existing) : {};
          existing['photoUserUrl'] = response.photoUserUrl;
          existing['photoUserId'] = response.id;
          localStorage.setItem('user', JSON.stringify(existing));

          this.user.subscribe(u => {
            u.photoUserId = response.id;
            u.photoUserUrl = response.photoUserUrl;
          });
        }
        return response;
      })
    );
  }

  editProfileImage(form: FormData,idPhoto: number) {
    return this.http.post(`${environment.apiUrl}/accounts/edit-photo/${idPhoto}`, form).pipe(
      map((response: User) => {
        if (response) {
          var existing = localStorage.getItem('user');
          existing = existing ? JSON.parse(existing) : {};
          existing['photoUserUrl'] = response.photoUserUrl;
          existing['photoUserId'] = response.id;
          localStorage.setItem('user', JSON.stringify(existing));

          this.user.subscribe(u => {
            u.photoUserUrl = response.photoUserUrl;
            u.photoUserId = parseInt(response.id) 
          });
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

  changePassword(changePwd: ChangePassword) {
    return this.http.post(`${environment.apiUrl}/accounts/change_password`, changePwd).pipe(
      map((response: string) => {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        return response;
      })
    );
  }

  getUsers() {
    return this.http.get(`${environment.apiUrl}/accounts`).pipe(
      map((response: any) => {
        var usersFeedbacks: UserFeedback[] = [];
        response.forEach(user => {
          var feedbacks = user.feedbacks
          feedbacks.forEach(feedback => {
            if (feedback.isApproved){
              var ele: UserFeedback = {
                fullName: user.fullName,
                photoUrl: user.photoUserUrl,
                comments: feedback.comments
              }
              usersFeedbacks.push(ele);
            }
          });
        });
        return usersFeedbacks;
      })
    );
  }
}
