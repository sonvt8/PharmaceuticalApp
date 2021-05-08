import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../_models/category.model';
import { Pagination } from '../_models/pagination';
import { Product } from '../_models/product.model';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';
import { CategoryService } from '../_services/category.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  currentUser: User;
  username: string;
  
  constructor(
    private accountService: AccountService, private router: Router
  ) {
    this.accountService.user.subscribe(x => {
      this.currentUser = x;
      try {
        this.username = x["fullName"];
      } catch {
      }
    });
  }

  ngOnInit(): void {
  }

  onSearch(search: string) {
    this.router.navigate(["/product-search", { term: search }]);
  }


  logOut() {
    this.accountService.logout();
  }

}
