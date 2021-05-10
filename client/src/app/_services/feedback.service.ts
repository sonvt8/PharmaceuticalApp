import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Feedback } from '../_models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private readonly http: HttpClient) { }

  sendFeedback(feedback: Feedback) {
    return this.http.post<Feedback>(`${environment.apiUrl}/feedBacks`, feedback);
  }
}
