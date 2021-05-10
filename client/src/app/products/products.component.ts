import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Category } from '../_models/category.model';
import { Pagination } from '../_models/pagination';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  id: number;
  count: number = 0;
  cates: Category[] = []
  categoryId: number = 0;
  products: Product[];
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 4;
  search = "";

  constructor(
    private productService: ProductService,
    public categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );
    this.loadProductList();
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadProductList();
  }

  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.loadProductList();
  }

  // loadProducts(){
  //   this.productService.getProductsByCategoryId(this.id).subscribe(products => {
  //     this.categoryName = products[0].categoryName;
  //     this.products = products;
  //     this.count = products.length;
  //   })
  // }

  loadProductList() {
    this.productService.resetList(this.id, this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.categoryId = res.result[0].categoryId;
      this.products = res.result;
      this.pagination = res.pagination;
      this.count = res.pagination.totalItems;
      this.categoryService.getCategories().subscribe(response=>{
        this.cates = response as Category[];
      })
    })
  }

  findCachedItemById(value: number) {
    if (this.cates == null || this.cates.length === 0) { return ''; }
    for (const item of this.cates) {
      if (item.id == value) {
        return item.categoryName;
      }
    }
    return '';
  }
}
