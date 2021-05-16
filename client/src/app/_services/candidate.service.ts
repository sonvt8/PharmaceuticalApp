import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate } from '../_models/cadidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl = environment.apiUrl + "/accounts";

  constructor(private http: HttpClient) { }

  uploadResume(file: FormData) {
    return this.http.post(`${environment.apiUrl}/candidates/uploadcv`, file, {reportProgress: true, observe: 'events'});
  }

  createCadidate(candidate: Candidate) {
    return this.http.put(`${environment.apiUrl}/candidates`, candidate);
  }
}
