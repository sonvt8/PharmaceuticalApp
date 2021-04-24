import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_model/category.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  @Input() cate: any;
  @Input()
  public myCallback: Function; 
  ModalTitle:string
  CategoryId: number;
  CategoryName: string;
  CategoryDescription: string;
  
  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.CategoryId = this.cate.id;
    this.CategoryName = this.cate.categoryName;
    this.CategoryDescription = this.cate.categoryDescription;
  }

  addCategory() {
    var val = {
      id: this.CategoryId,
      categoryName: this.CategoryName,
      categoryDescription: this.CategoryDescription
    };
    
    this.categoryService.addCategory(val).subscribe(res => {
      this.toastr.success("Added successfully");
      this.myCallback();
    }, error => {
      this.toastr.error("Added unsuccessfully");
    });
  }

  updateCategory() {
    var val = {
      id: this.CategoryId,
      categoryName: this.CategoryName,
      categoryDescription: this.CategoryDescription
    };
    this.categoryService.updateCategory(val).subscribe(res => {
      this.toastr.success("Updated successfully");
      this.myCallback();
    }, error => {
      this.toastr.error("Updated unsuccessfully");
    });
  }


}
