import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/_models/candidate';
import { CandidateService } from 'src/app/_service/candidate.service';

@Component({
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css']
})
export class AddEditCandidateComponent implements OnInit {

  @Input() candidate: any;
  @Input()
  public myCallback: Function;
  ModalTitle: string
  
  constructor(public candidateService: CandidateService, private toastr: ToastrService) { }

  ngOnInit(): void {}

  onApproved() {
    this.candidate.isApproved = true;
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
    this.candidateService.putCandidate(this.candidate).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Reject successfully');
      },
      err => { console.log(err); }
    )
  }

  getColor(val:any){
    if(val==null) return 'badge badge-warning'
    else if(val==true) return 'badge badge-success'
    else return 'badge badge-danger'
}

}
