import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_model/pagination';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  products: any = []
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  prod: any
  ModalTitle:string
  ActivateAddEditProComp=false;
  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadProductList();
  }

  loadProductList(){
    this.productService.getProductList(this.pageNumber, this.pageSize).subscribe(res=>{
      this.products = res.result;
      this.pagination = res.pagination;
    })
    
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadProductList();
  }

  addClick(){

  }

  editClick(item: any){

  }

  deleteClick(item: any){
    
  }

  // closeClick(){
  //   this.ActivateAddEditProComp=false;
  // }

}
