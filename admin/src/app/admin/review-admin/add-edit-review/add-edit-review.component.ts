import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_service/product.service';
import { ReviewService } from 'src/app/_service/review.service';

@Component({
  selector: 'app-add-edit-review',
  templateUrl: './add-edit-review.component.html',
  styleUrls: ['./add-edit-review.component.css']
})
export class AddEditReviewComponent implements OnInit {

  @Input() review: any;
  @Input()
  public myCallback: Function;
  ModalTitle: string
  //@Input() products: Product[] = []

  constructor(public reviewService: ReviewService, private productService: ProductService, private toastr: ToastrService) { }


  ngOnInit(): void {
    // this.productService.getProducts().subscribe(response=>{
    //   this.products = response as Product[];
    // })
  }
  onApproved() {
    this.review.isApproved = true;
    this.reviewService.putReview(this.review).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Approve successfully');
      },
      err => { console.log(err); }
    )
  }

  onRejected() {
    this.review.isApproved = false;
    this.reviewService.putReview(this.review).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Reject successfully');
      },
      err => { console.log(err); }
    )
  }

  getColor(val: any) {
    if (val == null) return 'badge badge-warning'
    else if (val == true) return 'badge badge-success'
    else return 'badge badge-danger'
  }

  // findCachedItemById(value: number) {
  //   if (this.products == null || this.products.length === 0) { return ''; }
  //   for (const item of this.products) {
  //     if (item.id == value) {
  //       return item.productName;
  //     }
  //   }
  //   return '';
  // }
}
