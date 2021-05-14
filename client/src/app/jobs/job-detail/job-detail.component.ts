import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/_models/job.model';
import { JobService } from 'src/app/_services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CandidateService } from 'src/app/_services/candidate.service';
import { ToastrService } from 'ngx-toastr';
import { UserUpdate } from 'src/app/_models/userUpdate.model';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit, OnDestroy {
  currentUser: User;
  job: Job;
  id: number;
  count: number = 0;
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
    private router: Router
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
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      degree: this.currentUser.degree
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
        ++this.count;
        this.message = `Upload ${this.count} ${this.count > 1 ? 'files' : 'file'} successfully.`;
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
    console.log(this.resumeForm.controls['degree'].value)

    // this.currentUser['degree'] = this.resumeForm.controls['degree'].value;

    // var userUpdated: UserUpdate = {
    //   fullName: this.currentUser.fullName,
    //   email: this.currentUser.email,
    //   gender: this.currentUser.gender,
    //   streetAddress: this.currentUser.streetAddress,
    //   state: this.currentUser.state,
    //   city: this.currentUser.city,
    //   country: this.currentUser.country,
    //   phoneNumber: this.currentUser.phoneNumber,
    //   zip:this.currentUser.zip,
    //   degree:this.currentUser.degree
    // };

    // this.accountService.update(userUpdated).subscribe(response => {
    //   if(response)  {
    //     this.toastr.success('Your resume has been uploaded successfully');
    //     this.router.navigate(['../'], { relativeTo: this.route });
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
