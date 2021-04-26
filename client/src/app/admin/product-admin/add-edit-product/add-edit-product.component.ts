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

  Id: number
  ProductName: string
  OutPut: string
  CapsuleSize: string
  MachineDimension: string
  ModelNumber: number
  Dies: number
  MaxPressure: number
  MaxDiameter: number
  MaxDepth: number
  ProductionCapacity: string
  MachineSize: string
  NetWeight: number
  category: any

  CategoryList: any = []

  constructor(private productService: ProductService, private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCategoryList();
  }

  loadCategoryList() {
    this.categoryService.getCateList().subscribe((data: any) => {
      this.CategoryList = data;

      this.Id = this.pro.Id;
      this.ProductName = this.pro.ProductName;
      this.OutPut = this.pro.OutPut;
      this.CapsuleSize = this.pro.CapsuleSize;
      this.MachineDimension = this.pro.MachineDimension;
      this.ModelNumber = this.pro.ModelNumber;
      this.Dies = this.pro.Dies;
      this.MaxPressure = this.pro.MaxPressure;
      this.MaxDiameter = this.pro.MaxDiameter;
      this.MaxDepth = this.pro.MaxDepth;
      this.ProductionCapacity = this.pro.ProductionCapacity;
      this.MachineSize = this.pro.MachineSize;
      this.NetWeight = this.pro.NetWeight;
      this.category = this.pro.category
    });
  }

  addProduct() {
    var val = {
      Id : this.pro.Id,
      ProductName : this.pro.ProductName,
      OutPut : this.pro.OutPut,
      CapsuleSize : this.pro.CapsuleSize,
      MachineDimension : this.pro.MachineDimension,
      ModelNumber : this.pro.ModelNumber,
      Dies : this.pro.Dies,
      MaxPressure : this.pro.MaxPressure,
      MaxDiameter : this.pro.MaxDiameter,
      MaxDepth : this.pro.MaxDepth,
      ProductionCapacity : this.pro.ProductionCapacity,
      MachineSize : this.pro.MachineSize,
      NetWeight : this.pro.NetWeight,
      category : this.pro.category
    };

    this.productService.addProduct(val).subscribe(res=>{
      this.toastr.success("Added successfully");
    },error=>{
      this.toastr.error("Added unsuccessfully");
    });
  }

  updateProduct() {
    var val = {
      Id : this.pro.Id,
      ProductName : this.pro.ProductName,
      OutPut : this.pro.OutPut,
      CapsuleSize : this.pro.CapsuleSize,
      MachineDimension : this.pro.MachineDimension,
      ModelNumber : this.pro.ModelNumber,
      Dies : this.pro.Dies,
      MaxPressure : this.pro.MaxPressure,
      MaxDiameter : this.pro.MaxDiameter,
      MaxDepth : this.pro.MaxDepth,
      ProductionCapacity : this.pro.ProductionCapacity,
      MachineSize : this.pro.MachineSize,
      NetWeight : this.pro.NetWeight,
      category : this.pro.category
    };

    this.productService.updateProduct(val).subscribe(res=>{
      this.toastr.success("Updated successfully");
    },error=>{
      this.toastr.error("Updated unsuccessfully");
    });
  }

}
