import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

}
