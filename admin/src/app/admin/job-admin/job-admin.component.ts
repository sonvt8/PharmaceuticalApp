import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Job } from 'src/app/_models/job';
import { JobService } from 'src/app/_service/job.service';

@Component({
  selector: 'app-job-admin',
  templateUrl: './job-admin.component.html',
  styleUrls: ['./job-admin.component.css']
})
export class JobAdminComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {}
  jobs: Job[] = []
  job: Job
  ModalTitle: string
  ActivateAddEditJobComp = false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public jobService: JobService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.showJobtList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showJobtList() {
    this.jobService.resetList().subscribe(res => {
      this.jobs = res as Job[];
      this.dtTrigger.next();
    })

  }


  addClick() {
    this.job = new Job();
    this.ModalTitle = "Add Job";
    this.ActivateAddEditJobComp = true;
  }

  editClick(item: any) {
    this.job = item;
    this.ModalTitle = "Update Product";
    this.ActivateAddEditJobComp = true;
  }

  closeClick() {
    this.ActivateAddEditJobComp = false;
    this.closebutton.nativeElement.click();
    this.jobService.resetList().subscribe(res => {
      this.jobs = res as Job[];
    })
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.jobService.deleteJob(item)
        .subscribe(
          res => {
            this.jobService.resetList().subscribe(res => {
              this.jobs = res as Job[];
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

}
