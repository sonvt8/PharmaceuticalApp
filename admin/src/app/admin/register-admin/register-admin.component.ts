import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  model: any={}
  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router ) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(res=>{
      this.toastr.success('Register successfully');
      this.router.navigateByUrl("/");
    },error=>{
      this.toastr.error('Register unsuccessfully');
    })
  }

  onGenserSelectionChange(entry:any): void {
    this.model.gender = entry;
}

}
