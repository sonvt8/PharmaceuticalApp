import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product.model';

@Component({
  selector: 'app-product-search-list',
  templateUrl: './product-search-list.component.html',
  styleUrls: ['./product-search-list.component.css']
})
export class ProductSearchListComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
