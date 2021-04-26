import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-admin-test',
  templateUrl: './product-admin-test.component.html',
  styleUrls: ['./product-admin-test.component.css']
})
export class ProductAdminTestComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {}
  products: Product[] = []
  prod: any
  ModalTitle:string
  ActivateAddEditProComp=false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.showProductList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showProductList(){
    this.productService.resetList().subscribe(res=>{
        this.products = res as Product[];
        this.dtTrigger.next();  
    })
     
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

  closeClick(){
    this.ActivateAddEditProComp=false;
    this.closebutton.nativeElement.click();
    this.productService.resetList();
  }

  deleteClick(id:number){
    if(confirm("Are you sure to delete this record?")){
      this.productService.deleteProduct(id)
      .subscribe(
        res=>{
          this.productService.resetList();
          this.toastr.error('Deleted successfully');
        },
        err=>{console.log(err); }
      )
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
