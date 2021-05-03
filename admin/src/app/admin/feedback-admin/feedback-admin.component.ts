import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FeedBack } from 'src/app/_models/feedback';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_service/account.service';
import { FeedbackService } from 'src/app/_service/feedback.service';

@Component({
  selector: 'app-feedback-admin',
  templateUrl: './feedback-admin.component.html',
  styleUrls: ['./feedback-admin.component.css']
})
export class FeedbackAdminComponent implements OnInit {

  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  search = "";
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
    this.showFeedBackList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showFeedBackList() {
    this.feedbackService.resetList(this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.feedbacks = res.result;
      this.pagination = res.pagination;
      this.accountService.resetList().subscribe(response => {
        this.users = response as User[];
      })
    })

  }


  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.showFeedBackList();
  }

  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.showFeedBackList();
  }

  editClick(item: any) {
    this.feedback = item;
    this.ModalTitle = "Approval FeedBack";
    this.ActivateAddEditFBComp = true;
  }

  closeClick() {
    this.ActivateAddEditFBComp = false;
    this.closebutton.nativeElement.click();
    this.showFeedBackList();
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.feedbackService.deleteFeedBack(item)
        .subscribe(
          res => {
            this.showFeedBackList();
            this.toastr.success('Deleted successfully');
          },
          err => { console.log(err); }
        )
    }
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
