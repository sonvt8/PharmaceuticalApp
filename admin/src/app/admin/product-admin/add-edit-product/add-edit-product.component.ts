import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';
import { Product } from 'src/app/_models/product';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  @Input() pro: Product;
  @Input()
  public myCallback: Function; 
  ModalTitle:string
  cateList: Category[] = []
  
  constructor(public productService: ProductService, private toastr: ToastrService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.resetList().subscribe(res=>{
      this.cateList = res as Category[];

    })
  }
  onSubmit(){
    if(this.pro.id==0){
      this.insertRecord();
    }
    else{
      this.updateRecord();
    }
  }

  insertRecord(){
    this.productService.postProduct(this.pro).subscribe(
      res=>{
        this.myCallback();
        this.toastr.success('Submitted successfully');
      },
      err=>{this.toastr.error('Submitted unsuccessfully');; }
    )
  }

  updateRecord(){
    this.productService.putProduct(this.pro).subscribe(
      res=>{
        this.myCallback();
        this.toastr.success('Updated successfully');
      },
      err=>{this.toastr.error('Updated unsuccessfully');}
    )
  }

}
