import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  products: any = []
  cates: Category[] = []
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  search="";

  prod: Product
  ModalTitle:string
  ActivateAddEditProComp=false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;

  constructor(private productService: ProductService, public categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadProductList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  loadProductList(){
    this.productService.resetList(this.pageNumber, this.pageSize, this.search).subscribe(res=>{
      this.products = res.result;
      this.pagination = res.pagination;
      this.categoryService.resetList().subscribe(response=>{
        this.cates = response as Category[];
      })
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
    this.prod = new Product();
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
    this.closebutton.nativeElement.click();
    this.loadProductList();
  }

  findCachedItemById(value: number) {
    if (this.cates == null || this.cates.length === 0) { return ''; }
    for (const item of this.cates) {
      if (item.id == value) {
        return item.categoryName;
      }
    }
    return '';
  }

}
