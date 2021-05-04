import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Job } from 'src/app/_models/job';
import { Pagination } from 'src/app/_models/pagination';
import { JobService } from 'src/app/_service/job.service';

@Component({
  selector: 'app-job-admin',
  templateUrl: './job-admin.component.html',
  styleUrls: ['./job-admin.component.css']
})
export class JobAdminComponent implements OnInit {

  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  search = "";
  jobs: Job[] = []
  job: Job
  ModalTitle: string
  ActivateAddEditJobComp = false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;

  constructor(public jobService: JobService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showJobtList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showJobtList() {
    this.jobService.resetList(this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.jobs = res.result;
      this.pagination = res.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.showJobtList();
  }

  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.showJobtList();
  }

  addClick() {
    this.job = new Job();
    this.ModalTitle = "Add Job";
    this.ActivateAddEditJobComp = true;
  }

  editClick(item: any) {
    this.job = item;
    this.ModalTitle = "Update Job";
    this.ActivateAddEditJobComp = true;
  }

  closeClick() {
    this.ActivateAddEditJobComp = false;
    this.closebutton.nativeElement.click();
    this.showJobtList();
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.jobService.deleteJob(item)
        .subscribe(
          res => {
            this.showJobtList();
            this.toastr.success('Deleted successfully');
          },
          err => { console.log(err); }
        )
    }
  }

  getColor(val:boolean){
    if(val==true) return 'badge badge-success'
    else return 'badge badge-danger'
}

}
