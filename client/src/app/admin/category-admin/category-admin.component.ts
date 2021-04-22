import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { Subject } from 'rxjs';
import { Category } from 'src/app/_model/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {}
  categories: any[] = []
  cate: any
  ModalTitle:string
  ActivateAddEditCateComp=false;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.showCateList();
  }

  showCateList(){
    this.categoryService.getCateList().subscribe(res=>{
      this.categories = res,
      this.dtTrigger.next();
    })
    
  }

  
  addClick(){
    this.cate={
      Id:0,
      CategoryName:"",
      CategoryDescription:""
    }
    this.ModalTitle="Add Category";
    this.ActivateAddEditCateComp=true;
  }

  editClick(item){
    this.cate=item;
    this.ModalTitle="Edit Category";
    this.ActivateAddEditCateComp=true;
  }

  closeClick(){
    this.ActivateAddEditCateComp=false;
    this.categoryService.getCateList().subscribe(res=>{
      this.categories = res;
    })
  }

  deleteClick(item){
    if(confirm('Are you sure')){
      this.categoryService.deleteCategory(item).subscribe(res=>{
        //this.toastr.error("Deleted successfully");
        this.categoryService.getCateList().subscribe(res=>{
          this.categories = res;
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
