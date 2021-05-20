import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReviewService } from 'src/app/_services/review.service';
import { Review } from 'src/app/_models/review.model';
import { Product } from 'src/app/_models/product.model';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input() product: Product;

  reviewForm: FormGroup;
  loading = false;
  submitted = false;
  isCollapsed = true;
  starRating:number = 0;
  reviewExisted:boolean = false;
  id:number = 0;

  sub: Subscription;
  reviews: Review[];
  
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (this.id ) {
            this.reviewService.getReviewsByProductId(this.id ).subscribe(reviews => {
              this.reviews = reviews;
              this.reviewExisted = reviews.length > 0 && reviews.some(ele => ele.isApproved === true);
            })
          }
        }
      );

    this.reviewForm = this.formBuilder.group({
      nickName: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.reviewForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }

    if (this.starRating < 1) {
      this.toastr.error("Please choose your rating")
      return;
    }

    this.loading = true;

    var review: Review = {
      nickName: this.reviewForm.get('nickName').value,
      title: this.reviewForm.get('title').value,
      description:this.reviewForm.get('content').value,
      rating:this.starRating,
      isApproved: null,
      productId: this.id 
    };

    this.reviewService.submitReview(review).subscribe(response => {
      this.toastr.success('Your review will be considered and approved by Admin');
      this.reviewForm.reset();
      this.reload();
    },error => {
      this.toastr.error(error.error)
      this.loading = false;
    });
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
