import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/_models/job.model';
import { JobService } from 'src/app/_services/job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  currentUser: User;
  job: Job;
  id: number;

  constructor(private accountService : AccountService,private jobService: JobService, private modalService: NgbModal, private route: ActivatedRoute) { 
    this.accountService.user.subscribe(x => {
      this.currentUser = x;

    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.id = param['id'];
      if(this.id){
        this.loadJobDetail()
      }
    })
  }

  loadJobDetail(){
    this.jobService.getJobDetail(this.id).subscribe(res=>{
      this.job = res as Job;
    })
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
