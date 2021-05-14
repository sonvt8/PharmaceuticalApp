import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/_models/job.model';
import { JobService } from 'src/app/_services/job.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CandidateService } from 'src/app/_services/candidate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit, OnDestroy {
  currentUser: User;
  job: Job;
  id: number;
  public progress: number;
  public message: string;
  loading: boolean = false;
  submitted: boolean = false;

  fileToUpload: File = null;
  subscriptionId: Subscription;
  resumeForm: FormGroup;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private accountService : AccountService,
    private jobService: JobService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { 
    this.accountService.user.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
    this.subscriptionId = this.route.params.subscribe(param=>{
      this.id = param['id'];
      if(this.id){
        this.loadJobDetail()
      }
    })

    this.resumeForm = this.formBuilder.group({
      fullname: [this.currentUser.fullName, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resumeForm.controls; }

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

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.resumeForm.invalid) {
        return;
    }
    this.loading = true;

    this.currentUser['fullName'] = this.resumeForm.controls['fullname'].value;
    this.currentUser['email'] = this.resumeForm.controls['email'].value;

    // this.accountService.update(this.currentUser).subscribe(response => {
    //   if(response)  {
    //     this.toastr.success('Your profile has been updated successfully');
    //     this.router.navigate(['../back'], { relativeTo: this.route });
    //   }
    // },error => {
    //   this.toastr.error(error.error)
    //   this.loading = false;
    // })
  }

  ngOnDestroy(){
    this.subscriptionId.unsubscribe();
  }

}
