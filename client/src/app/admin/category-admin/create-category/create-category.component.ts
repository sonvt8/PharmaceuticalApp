import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/_model/category.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  @Input() cate: any;
  ModalTitle:string
  CategoryId: number;
  CategoryName: string;
  CategoryDescription: string;
  
  constructor(private categoryService: CategoryService, private router: Router) { }

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
      //this.router.navigateByUrl('/category-admin');
    }, error => {
      console.log(error);
    });
  }

  updateCategory() {
    var val = {
      id: this.CategoryId,
      categoryName: this.CategoryName,
      categoryDescription: this.CategoryDescription
    };
    this.categoryService.updateCategory(val).subscribe(res => {
      //this.router.navigateByUrl('/category-admin');
    }, error => {
      console.log(error);
    });
  }

  // resetForm(form:NgForm){
  //   form.form.reset();
  //   this.categoryService.formData = new Category();
  // }

}
