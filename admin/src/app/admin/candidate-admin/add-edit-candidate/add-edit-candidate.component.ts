import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/_models/candidate';
import { CareerProfile } from 'src/app/_models/carreerProfile';
import { Job } from 'src/app/_models/job';
import { CandidateService } from 'src/app/_service/candidate.service';
import { JobService } from 'src/app/_service/job.service';

@Component({
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css']
})
export class AddEditCandidateComponent implements OnInit {

  @Input() candidate: any;
  job: Job;
  carreerProfiles: CareerProfile[] = []
  carreerProfile: CareerProfile
  fileNames: string[] = []
  @Input()
  public myCallback: Function;
  ModalTitle: string

  constructor(public candidateService: CandidateService, private jobService: JobService, private toastr: ToastrService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.candidate.downloads.length; i++) {
      this.fileNames.push(this.candidate.downloads[i].fileName);
    }
    if(this.candidate.jobId){
      this.getJobById();
    }
    
    this.getCareerProfile();
  }

  getJobById() {
    this.jobService.getJobById(this.candidate.jobId).subscribe(res => {
      this.job = res as Job;
    })
  }

  getCareerProfile() {
    this.candidateService.getCareerProfile(this.candidate.id).subscribe(res => {
      this.carreerProfiles = res as CareerProfile[];
      if (this.carreerProfiles.length > 0) {
        let n = this.carreerProfiles.length
        for (let i = 0; i < n; i++) {
          this.carreerProfile = this.carreerProfiles[n - 1];
        }
      }
    })
  }

  onApproved() {
    this.candidate.isApproved = true;
    this.job.quantity -= 1;
    this.carreerProfile.isApproved = true;
    this.candidateService.putCareerProfile(this.carreerProfile).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Update Carreer Profile successfully');
      },
      err => { console.log(err); }
    )
    if (this.job.quantity == 0) {
      this.job.isAvailable = false;
    }
    this.jobService.putJob(this.job).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('slot of ' + this.job.jobName + ' job left ' + this.job.quantity);
      },
      err => { console.log(err); }
    )
    this.candidateService.putCandidate(this.candidate).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Interview confirmation email has been sent to candidate');
      },
      err => { console.log(err); }
    )
  }

  onRejected() {
    this.candidate.isApproved = false;
    this.candidate.jobId = null;
    this.carreerProfile.isApproved = false;
    this.candidateService.putCareerProfile(this.carreerProfile).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Update Carreer Profile successfully');
      },
      err => { console.log(err); }
    )
    this.candidateService.putCandidate(this.candidate).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Reject successfully');
      },
      err => { console.log(err); }
    )
    this.candidateService.deleteFileDownload(this.candidate.id).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Delete CV of Candidate successfully');
      },
      err => { console.log(err); }
    )
  }

  getColor(val: any) {
    if (val == null) return 'badge badge-warning'
    else if (val == true) return 'badge badge-success'
    else return 'badge badge-danger'
  }

}
