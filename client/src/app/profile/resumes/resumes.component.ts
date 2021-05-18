import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CareerProfile } from 'src/app/_models/careerProfile.model';

import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { CandidateService } from 'src/app/_services/candidate.service';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css']
})
export class ResumesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUser: User;
  careerProfiles: CareerProfile[];

  constructor(private accountService: AccountService, private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.subscription = this.accountService.user
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        }
      );
    this.loadCareerProfile();
  }

  loadCareerProfile(){
    this.candidateService.getCareerProfile(parseInt(this.currentUser.id)).subscribe(res => {
      this.careerProfiles = res as CareerProfile[];
    });
  }

  getColor(val:any){
    if(val==null) return 'badge badge-warning'
    else if(val==true) return 'badge badge-success'
    else return 'badge badge-danger'
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
