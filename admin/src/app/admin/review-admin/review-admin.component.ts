import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { RequestTotal } from 'src/app/_models/requestTotal';
import { Review } from 'src/app/_models/review';
import { ProductService } from 'src/app/_service/product.service';
import { ReviewService } from 'src/app/_service/review.service';

@Component({
  selector: 'app-review-admin',
  templateUrl: './review-admin.component.html',
  styleUrls: ['./review-admin.component.css']
})
export class ReviewAdminComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  search = "";
  reviews: Review[] = []
  review: Review
  request: RequestTotal
  products: Product[] = []
  ModalTitle: string
  ActivateAddEditReviewComp = false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;
  pendingRequest:number=0;
  approvedRequest:number=0;
  rejectedRequest:number=0;

  constructor(public reviewService: ReviewService, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showReviewList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showReviewList() {
    this.reviewService.resetList(this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.reviews = res.result;
      this.pagination = res.pagination;
      this.getRequestReview();
      this.productService.getProducts().subscribe(response => {
        this.products = response as Product[];
      })
    })

  }
  getRequestReview(){
    this.reviewService.getReview().subscribe(res=>{
      this.request = res as RequestTotal
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.showReviewList();
  }

  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.showReviewList();
  }
  editClick(item: any) {
    this.review = item;
    this.ModalTitle = "Approval Review";
    this.ActivateAddEditReviewComp = true;
  }

  closeClick() {
    this.ActivateAddEditReviewComp = false;
    this.closebutton.nativeElement.click();
    this.showReviewList();
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.reviewService.deleteReview(item)
        .subscribe(
          res => {
            this.showReviewList();
            this.toastr.success('Deleted successfully');
          },
          err => { console.log(err); }
        )
    }
  }


  findCachedItemById(value: number) {
    if (this.products == null || this.products.length === 0) { return ''; }
    for (const item of this.products) {
      if (item.id == value) {
        return item.productName;
      }
    }
    return '';
  }

  getColor(val: any) {
    if (val == null) return 'badge badge-warning'
    else if (val == true) return 'badge badge-success'
    else return 'badge badge-danger'
  }

}
