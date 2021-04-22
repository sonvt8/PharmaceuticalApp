import { Component, OnInit } from '@angular/core';
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

  constructor(public categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.categoryService.formData.id==0){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm){
    this.categoryService.postCategory().subscribe(
      res=>{
        //this.resetForm(form);
        this.categoryService.resetList();
        this.router.navigateByUrl('/category-admin');
        //this.toastr.success('Submitted successfully','Payment Detail Register');
      },
      err=>{console.log(err); }
    )
  }

  updateRecord(form:NgForm){
    this.categoryService.putCategory().subscribe(
      res=>{
        //this.resetForm(form);
        this.categoryService.resetList();
        this.router.navigateByUrl('/category-admin');
        //this.toastr.info('Updated successfully','Payment Detail Register');
      },
      err=>{console.log(err); }
    )
  }

  // resetForm(form:NgForm){
  //   form.form.reset();
  //   this.categoryService.formData = new Category();
  // }

}
