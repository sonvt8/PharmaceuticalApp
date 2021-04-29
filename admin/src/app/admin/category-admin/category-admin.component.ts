import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {}
  categories: Category[] = []
  cate: Category
  ModalTitle:string
  ActivateAddEditCateComp=false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.showCateList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showCateList(){
    this.categoryService.resetList().subscribe(res=>{
      this.categories = res as Category[],
      this.dtTrigger.next();
    })
    
  }

  
  addClick() {
    this.cate = new Category();
    this.ModalTitle = "Add Category";
    this.ActivateAddEditCateComp = true;
  }

  editClick(item: any) {
    this.cate = item;
    this.ModalTitle = "Update Category";
    this.ActivateAddEditCateComp = true;
  }

  closeClick() {
    this.ActivateAddEditCateComp = false;
    this.closebutton.nativeElement.click();
    this.categoryService.resetList().subscribe(res => {
      this.categories = res as Category[];
    })
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.categoryService.deleteCategory(item)
        .subscribe(
          res => {
            this.categoryService.resetList().subscribe(res => {
              this.categories = res as Category[];
            })
            this.toastr.success('Deleted successfully');
          },
          err => { console.log(err); }
        )
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
