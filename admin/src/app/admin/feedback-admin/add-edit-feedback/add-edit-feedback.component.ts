import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedBack } from 'src/app/_models/feedback';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_service/account.service';
import { FeedbackService } from 'src/app/_service/feedback.service';

@Component({
  selector: 'app-add-edit-feedback',
  templateUrl: './add-edit-feedback.component.html',
  styleUrls: ['./add-edit-feedback.component.css']
})
export class AddEditFeedbackComponent implements OnInit {

  @Input() feedback: any;
  @Input()
  public myCallback: Function;
  ModalTitle: string
  user: User
  
  constructor(public feedBackService: FeedbackService, private toastr: ToastrService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccount(this.feedback.appUserId).subscribe(res=>{
      this.user = res as User;
    })
  }
  onApproved() {
    this.feedback.isApproved = true;
    this.feedBackService.putFeedBack(this.feedback).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Approve successfully');
      },
      err => { console.log(err); }
    )
  }

  onRejected() {
    this.feedback.isApproved = false;
    this.feedBackService.putFeedBack(this.feedback).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Reject successfully');
      },
      err => { console.log(err); }
    )
  }

  getColor(val:any){
    if(val==null) return 'badge badge-warning'
    else if(val==true) return 'badge badge-success'
    else return 'badge badge-danger'
}

}
