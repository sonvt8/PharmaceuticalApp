import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-admin-test',
  templateUrl: './product-admin-test.component.html',
  styleUrls: ['./product-admin-test.component.css']
})
export class ProductAdminTestComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {}
  products: any[] = []
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
    this.productService.getProducts().subscribe(res=>{
      this.products = res,
      this.dtTrigger.next();
    })
    
  }

  
  addClick(){
    this.prod = {
      Id : 0,
      ProductName: "",
      OutPut: "",
      CapsuleSize: "",
      MachineDimension: "",
      ShippingWeight: "",
      ModelNumber: 0,
      Dies: 0,
      MaxPressure: 0,
      MaxDiameter: 0,
      MaxDepth: 0,
      ProductionCapacity:"",
      MachineSize:"",
      NetWeight:0,
      CategoryName:"",
      PhotoProductUrl:""
    };
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
    this.productService.getProducts().subscribe(res=>{   
      this.products = res;
    })
  }

  deleteClick(item: any){
    if(confirm('Are you sure')){
      this.productService.deleteProduct(item).subscribe(res=>{
        this.toastr.error("Deleted successfully");
        this.productService.getProducts().subscribe(res=>{
          this.products = res;
        })
      },error=>{
        //this.toastr.error("Deleted unsuccessfully");
        console.log(error);
      });
      
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
