import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_model/pagination';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  products: any = []
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  search="";

  prod: any
  ModalTitle:string
  ActivateAddEditProComp=false;
  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadProductList();
  }

  loadProductList(){
    this.productService.getProductList(this.pageNumber, this.pageSize, this.search).subscribe(res=>{
      this.products = res.result;
      this.pagination = res.pagination;
    })
    
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadProductList();
  }

  onSearch() {
    if(this.products.count!=0){
      this.search = this.searchTerm.nativeElement.value;
      this.pageNumber = 1;
      this.loadProductList();
    }
    this.pagination=null;
  }

  addClick(){
    this.prod = {
      id : 0,
      productName: "",
      outPut: "",
      capsuleSize: "",
      machineDimension: "",
      modelNumber: 0,
      dies: 0,
      maxPressure: 0,
      maxDiameter: 0,
      maxDepth: 0,
      productionCapacity:"",
      machineSize:"",
      netWeight:0,
      categoryName:""
    };
    this.ModalTitle="Add Product";
    this.ActivateAddEditProComp=true;
  }

  editClick(item: any){
    this.prod = item;
    this.ModalTitle="Update Product";
    this.ActivateAddEditProComp=true;
  }

  deleteClick(item: any){
    if(confirm('Are you sure')){
      this.productService.deleteProduct(item).subscribe(res=>{
        this.toastr.success("Deleted successfully");
        this.loadProductList();
      },error=>{
        this.toastr.error("Deleted unsuccessfully");
      });
      
    }
  }

  closeClick(){
    this.ActivateAddEditProComp=false;
    this.loadProductList();
  }

}
