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
  categories: Category[] = []
  cate: Category
  Title:string
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
    this.categoryService.resetList().subscribe(res=>{
      this.categories = res as Category[],
      this.dtTrigger.next();
    })
    
  }

  
  addClick(){
    this.cate={
      id:0,
      categoryName:"",
      categoryDescription:""
    }
    this.Title="Add Category";
    this.router.navigateByUrl('/create-category');
  }

  editClick(item){
    this.cate=item;
    this.Title="Edit Category";
    this.router.navigateByUrl('/create-category');
  }

  onDelete(id:number){
    if(confirm("Are you sure to delete this record?")){
      this.categoryService.deleteCategory(id)
      .subscribe(
        res=>{
          this.categoryService.resetList().subscribe(res=>{
            this.categories = res as Category[]
          })
          //this.toastr.error('Deleted successfully','Payment Detail Register');
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
