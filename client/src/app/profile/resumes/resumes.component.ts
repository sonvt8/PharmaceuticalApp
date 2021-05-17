import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css']
})
export class ResumesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUser: User;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscription = this.accountService.user
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        }
      );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
