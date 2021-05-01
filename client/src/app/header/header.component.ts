import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';

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
    private accountService: AccountService
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

  logOut() {
    this.accountService.logout();
  }

}
