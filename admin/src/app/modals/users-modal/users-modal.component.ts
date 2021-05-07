import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css']
})
export class UsersModalComponent implements OnInit {

  @Input() user: User;
  @Input()
  public myCallback: Function; 
  ModalTitle:string
  
  constructor(public accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }
  onSubmit(){
    this.updateRecord();
  }

  updateRecord(){
    this.accountService.putUser(this.user).subscribe(
      res=>{
        this.myCallback();
        this.toastr.success('Updated successfully');
      },
      err=>{this.toastr.error('Updated unsuccessfully');}
    )
  }

}
