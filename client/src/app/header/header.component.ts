import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../_models/category.model';
import { Pagination } from '../_models/pagination';
import { Product } from '../_models/product.model';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../_services/category.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  categories: Category[];

  currentUser: User;
  username: string;
  subscription: Subscription;

  constructor(
    private accountService: AccountService, 
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.subscription = this.accountService.user.subscribe(x => {
      this.currentUser = x;
      this.username = x?.fullName;
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  onSearch(search: string) {
    this.router.navigate(["/product-search", { term: search }]);
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(ele => {
      this.categories = ele;
    })
  }


  logOut() {
    this.accountService.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
