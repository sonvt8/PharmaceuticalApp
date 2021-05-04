import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';

import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {


  @Input() cate: Category;

  @Input()
  public myCallback: Function;
  ModalTitle: string


  constructor(public categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.cate.id == 0) {
      this.insertRecord();
    }
    else {
      this.updateRecord();
    }
  }

  insertRecord() {

    this.categoryService.postCategory(this.cate).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Added successfully');
      },
      err => { console.log(err); }
    )
  }

  updateRecord() {
    this.categoryService.putCategory(this.cate).subscribe(
      res => {
        this.myCallback();
        this.toastr.info('Updated successfully');
      },
      err => { console.log(err); }
    )
  }

}
