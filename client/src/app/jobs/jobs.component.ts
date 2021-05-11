import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ParticlesConfig from 'src/assets/json/particlesjs.json';
import { Job } from '../_models/job.model';
import { JobParams } from '../_models/jobParams.model';
import { Pagination } from '../_models/pagination';
import { JobService } from '../_services/job.service';
declare var particlesJS: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  jobs: Job[] = []
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
