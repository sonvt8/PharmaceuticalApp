import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/_models/job.model';
import { JobService } from 'src/app/_services/job.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

import { ProgressStatus, ProgressStatusEnum  } from 'src/app/_models/progress-status.model';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  currentUser: User;
  job: Job;
  id: number;

  fileToUpload: File = null;
  public progress: number;
  public message: string;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private accountService : AccountService,
    private jobService: JobService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private toastr: ToastrService
  ) { 
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

  onSelectFile(files: FileList) {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.candidateService.uploadResume(formData).subscribe(event  => {
      if (event.type === HttpEventType.UploadProgress)
      this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    },error => {
      this.toastr.error(error.error)
    })
  }

}
