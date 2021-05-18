import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Candidate } from '../_models/cadidate.model';
import { User } from '../_models/user.model';
import { AccountService } from './account.service';
import { CareerProfile } from '../_models/careerProfile.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl = environment.apiUrl + "/accounts";

  constructor(private http: HttpClient, private accountService: AccountService) { }

  uploadResume(file: FormData) {
    return this.http.post(`${environment.apiUrl}/candidates/uploadcv`, file, {reportProgress: true, observe: 'events'});
  }

  createCadidate(candidate: Candidate) {
    return this.http.put<User>(`${environment.apiUrl}/candidates`, candidate)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify({
        "IsApproved": user.IsApproved,
        "token": user.token,
        "jobId": user.job.id,
        "fullName": user.fullName,
        "email": user.email,
        "gender": user.gender,
        "phoneNumber": user.phoneNumber,
        "streetAddress": user.streetAddress,
        "state": user.state,
        "zip": user.zip,
        "country": user.country,
        "city": user.city,
        "job": user.job,
        "photoUserUrl": user.photoUserUrl,
        "photoUserId": user.photoUserId
      }));
      this.accountService.setCurrentUser(user);
      return user;
    }));
  }

  createCareerProfile(profile: CareerProfile) {
    return this.http.post(`${environment.apiUrl}/candidates/career_profile`, profile)
  }

  getCareerProfile(userId: number){
    return this.http.get(`${environment.apiUrl}/candidates/career_profile/${userId}`)
  }
}
