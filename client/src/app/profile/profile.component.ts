import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public items = [
    {
      name: 'Profile Detail',
      path: 'detail'
    },
    {
      name: 'Change Password',
      path: 'change-password'
    },
    {
      name: 'Manage Resumes',
      path: 'resumes'
    }
  ];

  username: string;
  selectedIndex: number;

  constructor(
    private accountService: AccountService
  ) {
    this.accountService.user.subscribe(x => {
      try {
        this.username = x["fullName"];
      } catch {
      }
    });
  }

  ngOnInit(): void {
    this.selectedIndex = 0;
  }

  select(index: number) {
    this.selectedIndex = index;
  }

}
