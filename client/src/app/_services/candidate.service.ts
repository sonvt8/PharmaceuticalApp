import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl = environment.apiUrl + "/accounts";

  constructor(private http: HttpClient) { }

  uploadResume(file: FormData) {
    return this.http.post(`${environment.apiUrl}/candidates/uploadcv`, file, {reportProgress: true, observe: 'events'});
  }
}
