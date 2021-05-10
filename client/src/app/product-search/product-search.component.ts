import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '../_models/pagination';
import { Product } from '../_models/product.model';
import { CategoryService } from '../_services/category.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  count: number = 0;
  products: Product[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 4;
  search = "";

  constructor(private productService: ProductService, public categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.search = params["term"];
      if (this.search) {
        this.loadProductList();
      }
      else{
        this.router.navigateByUrl("/");
      }
    });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadProductList();
  }

  loadProductList() {
    this.productService.resetProductList( this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.products = res.result;
      this.pagination = res.pagination;
      this.count = res.pagination.totalItems;
    })
  }

}
