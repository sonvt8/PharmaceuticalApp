import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  categories: any =[]


  constructor(private categoryServer: CategoryService) { }

  ngOnInit(): void {
    this.getNameCate();
  }

  getNameCate(){
    this.categoryServer.getCateList().subscribe(res=>{
      this.categories=res;
    })
  }
}
