import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../_models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  @Input() category: Category;
  @Input() cateIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

}
