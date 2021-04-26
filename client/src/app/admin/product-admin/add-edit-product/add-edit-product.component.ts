import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  @Input() pro: any;

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

  CategoryList: any = []

  constructor(private productService: ProductService, private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.loadCategoryList();
    this.ProductId = this.pro.id;
    this.ProductName = this.pro.productName;
    this.OutPut = this.pro.outPut;
    this.CapsuleSize = this.pro.capsuleSize;
    this.MachineDimension = this.pro.machineDimension;
    this.ShippingWeight = this.pro.shippingWeight;
    this.ModelNumber = this.pro.modelNumber;
    this.Dies = this.pro.dies;
    this.MaxPressure = this.pro.maxPressure;
    this.MaxDiameter = this.pro.maxDiameter;
    this.MaxDepth = this.pro.maxDepth;
    this.ProductionCapacity = this.pro.productionCapacity;
    this.MachineSize = this.pro.machineSize;
    this.NetWeight = this.pro.netWeight;
    this.CategoryName = this.pro.categoryName;
    this.PhotoProductUrl = this.pro.photoProductUrl

  }

  loadCategoryList() {
    this.categoryService.getCateList().subscribe((data: any) => {
      this.CategoryList = data;


    });
  }

  addProduct() {
    var val = {
      id: this.ProductId,
      productName: this.ProductName,
      outPut: this.OutPut,
      capsuleSize: this.CapsuleSize,
      machineDimension: this.MachineDimension,
      shippingWeight : this.ShippingWeight,
      modelNumber: this.ModelNumber,
      dies: this.Dies,
      maxPressure: this.MaxPressure,
      maxDiameter: this.MaxDiameter,
      maxDepth: this.MaxDepth,
      productionCapacity: this.ProductionCapacity,
      machineSize: this.MachineSize,
      netWeight: this.NetWeight,
      categoryName: this.CategoryName,
      photoProductUrl : this.PhotoProductUrl
    };

    this.productService.addProduct(val).subscribe(res => {
      this.toastr.success("Added successfully");
    }, error => {
      this.toastr.error("Added unsuccessfully");
    });
  }

  updateProduct() {
    var val = {
      id: this.ProductId,
      productName: this.ProductName,
      outPut: this.OutPut,
      capsuleSize: this.CapsuleSize,
      machineDimension: this.MachineDimension,
      shippingWeight : this.ShippingWeight,
      modelNumber: this.ModelNumber,
      dies: this.Dies,
      maxPressure: this.MaxPressure,
      maxDiameter: this.MaxDiameter,
      maxDepth: this.MaxDepth,
      productionCapacity: this.ProductionCapacity,
      machineSize: this.MachineSize,
      netWeight: this.NetWeight,
      categoryName: this.CategoryName,
      photoProductUrl : this.PhotoProductUrl
    };

    this.productService.updateProduct(val).subscribe(res => {
      this.toastr.success("Updated successfully");
    }, error => {
      this.toastr.error("Updated unsuccessfully");
    });
  }

}
