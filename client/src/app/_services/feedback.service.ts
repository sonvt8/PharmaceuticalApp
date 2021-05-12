import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FeedBack } from '../_models/feedBack.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private readonly http: HttpClient) { }

  sendFeedback(feedback: FeedBack) {
    return this.http.post<FeedBack>(`${environment.apiUrl}/feedBacks`, feedback);
  }
}
