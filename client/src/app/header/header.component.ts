import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isLoggedin = false;

  currentUser: User;
  username: string;
  subscription: Subscription;

  constructor(
    private accountService: AccountService
  ) {
    this.subscription = this.accountService.user.subscribe(x => {
      if(x) {
        this.currentUser = x;
        this.isLoggedin = true;
      }
      
      try {
        this.username = x.fullName;
      } catch {
      }
    });
  }

  ngOnInit(): void {
  }

  logOut() {
    this.accountService.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
