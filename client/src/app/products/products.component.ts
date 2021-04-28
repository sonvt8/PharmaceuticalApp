import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  id: number;
  count: number = 0;
  categoryName: string = "";
  products: Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProductsByCategoryId(this.id).subscribe(products => {
      this.categoryName = products[0].categoryName;
      this.products = products;
      this.count = products.length;
    })
  }
}
