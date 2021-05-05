import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Review } from '../_models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private readonly http: HttpClient) { }

  getReviewsByProductId(id: number) {
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/products/${id}`);
  }

  submitReview(review: Review) {
    return this.http.post(`${environment.apiUrl}/reviews`, review);
  }
}
