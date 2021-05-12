import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Job } from 'src/app/_models/job.model';
import { JobParams } from 'src/app/_models/jobParams.model';
import { Pagination } from 'src/app/_models/pagination';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  jobs: Job[] = [];
  jobParams: JobParams;
  pagination: Pagination;
  count=0;

  constructor(private jobService: JobService) {
      this.jobParams = new JobParams();
   }

  ngOnInit(): void {
    this.loadJob();
  }

  loadJob(){
    this.jobService.getJobPagination(this.jobParams).subscribe(res=>{
      this.jobs = res.result;
      this.pagination = res.pagination;
      this.count = res.pagination.totalItems;
    })
  }

  pageChanged(event: any) {
    this.jobParams.pageNumber = event.page;
    this.loadJob();
  }

  onSearch() {
    this.jobParams.search = this.searchTerm.nativeElement.value;
    this.jobParams.pageNumber = 1;
    this.loadJob();
  }

  resetFilters() {
    this.jobParams = this.jobService.resetJobParams();
    this.loadJob();
  }

}
