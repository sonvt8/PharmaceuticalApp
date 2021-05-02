import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FeedBack } from 'src/app/_models/feedback';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_service/account.service';
import { FeedbackService } from 'src/app/_service/feedback.service';

@Component({
  selector: 'app-feedback-admin',
  templateUrl: './feedback-admin.component.html',
  styleUrls: ['./feedback-admin.component.css']
})
export class FeedbackAdminComponent implements OnInit {

  dtOptions: DataTables.Settings = {}
  feedbacks: FeedBack[] = []
  feedback: FeedBack
  users: User[] = []
  ModalTitle: string
  ActivateAddEditFBComp = false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public feedbackService: FeedbackService, private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.showFeedBackList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showFeedBackList() {
    this.feedbackService.resetList().subscribe(res => {
      this.feedbacks = res as FeedBack[];
      this.dtTrigger.next();
      this.accountService.resetList().subscribe(response=>{
        this.users = response as User[];
      })
    })

  }


  // addClick() {
  //   this.feedback = new FeedBack();
  //   this.ModalTitle = "Add FeedBack";
  //   this.ActivateAddEditFBComp = true;
  // }

  editClick(item: any) {
    this.feedback = item;
    this.ModalTitle = "Approval FeedBack";
    this.ActivateAddEditFBComp = true;
  }

  closeClick() {
    this.ActivateAddEditFBComp = false;
    this.closebutton.nativeElement.click();
    this.feedbackService.resetList().subscribe(res => {
      this.feedbacks = res as FeedBack[];
    })
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.feedbackService.deleteFeedBack(item)
        .subscribe(
          res => {
            this.feedbackService.resetList().subscribe(res => {
              this.feedbacks = res as FeedBack[];
            })
            this.toastr.success('Deleted successfully');
          },
          err => { console.log(err); }
        )
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  findCachedItemById(value: number) {
    if (this.users == null || this.users.length === 0) { return ''; }
    for (const item of this.users) {
      if (item.id == value) {
        return item.fullName;
      }
    }
    return '';
  }

  getColor(val:any){
      if(val==null) return 'badge badge-warning'
      else if(val==true) return 'badge badge-success'
      else return 'badge badge-danger'
  }
}
