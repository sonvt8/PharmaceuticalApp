import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  displayLogin = true;
  account : string;
  constructor(
    private accountService: AccountService
  ) {}
  
  ngOnInit(): void {
    if (this.accountService.userValue) {
      this.displayLogin = false;
      this.account = this.accountService.userValue["fullName"];
    }
  }

  logOut() {
    this.accountService.logout();
  }

}
