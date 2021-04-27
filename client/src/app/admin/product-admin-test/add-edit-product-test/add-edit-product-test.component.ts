import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-edit-product-test',
  templateUrl: './add-edit-product-test.component.html',
  styleUrls: ['./add-edit-product-test.component.css']
})
export class AddEditProductTestComponent implements OnInit {

  @Input() pro: Product;
  @Input()
  public myCallback: Function; 
  ModalTitle:string
  
  ProductId: number
  ProductName: string
  OutPut: string
  CapsuleSize: string
  MachineDimension: string
  ShippingWeight: string
  ModelNumber: number
  Dies: number
  MaxPressure: number
  MaxDiameter: number
  MaxDepth: number
  ProductionCapacity: string
  MachineSize: string
  NetWeight: number
  CategoryName: string
  PhotoProductUrl: string
  
  constructor(public productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.ProductId = this.pro.id;
    // this.ProductName = this.pro.productName;
    // this.OutPut = this.pro.outPut;
    // this.CapsuleSize = this.pro.capsuleSize;
    // this.MachineDimension = this.pro.machineDimension;
    // this.ShippingWeight = this.pro.shippingWeight;
    // this.ModelNumber = this.pro.modelNumber;
    // this.Dies = this.pro.dies;
    // this.MaxPressure = this.pro.maxPressure;
    // this.MaxDiameter = this.pro.maxDiameter;
    // this.MaxDepth = this.pro.maxDepth;
    // this.ProductionCapacity = this.pro.productionCapacity;
    // this.MachineSize = this.pro.machineSize;
    // this.NetWeight = this.pro.netWeight;
    // this.CategoryName = this.pro.categoryName;
    // this.PhotoProductUrl = this.pro.photoProductUrl
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
