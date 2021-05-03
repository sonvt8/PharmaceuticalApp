import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  model: any ={}

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(res=>{
      this.router.navigateByUrl("/");
    }, error=>{
      console.log(error);
    })
  }

  
}
