import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ReviewService } from '../_services/review.service';
import { Review } from '../_models/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  starRating = 0;
  reviewExisted:boolean = false;
  sub: Subscription;
  reviews: Review[];
  
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          if (id) {
            this.reviewService.getReviewsByProductId(id).subscribe(reviews => {
              this.reviews = reviews;
              this.reviewExisted = reviews.length > 0;
            })
          }
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
