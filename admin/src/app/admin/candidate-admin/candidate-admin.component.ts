import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/_models/candidate';
import { Job } from 'src/app/_models/job';
import { Pagination } from 'src/app/_models/pagination';
import { RequestTotal } from 'src/app/_models/requestTotal';
import { User } from 'src/app/_models/user';
import { CandidateService } from 'src/app/_service/candidate.service';
import { JobService } from 'src/app/_service/job.service';

@Component({
  selector: 'app-candidate-admin',
  templateUrl: './candidate-admin.component.html',
  styleUrls: ['./candidate-admin.component.css']
})
export class CandidateAdminComponent implements OnInit {

  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  search = "";
  candidates: Candidate[] = []
  candidate: Candidate
  jobs: Job[] = []
  request: RequestTotal
  ModalTitle: string
  ActivateAddEditCandidateComp = false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;
  pendingRequest:number=0;
  approvedRequest:number=0;
  rejectedRequest:number=0;

  constructor(public candidateService: CandidateService, private jobService: JobService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showCandidateList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showCandidateList() {
    this.candidateService.resetList(this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.candidates = res.result;
      this.pagination = res.pagination;
      this.getRequestCandidate();
      this.jobService.getJobNoRequest().subscribe(response => {
        this.jobs = response as Job[];
        this.candidates.forEach(c => {
          if(c.jobId != null){
            c.jobTitle = this.findCachedItemById(c.jobId);
          }
        });
      })
    })

  }

  getRequestCandidate(){
    this.candidateService.getCandidate().subscribe(res=>{
      this.request = res as RequestTotal
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.showCandidateList();
  }

  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.showCandidateList();
  }

  editClick(item: any) {
    this.candidate = item;
    this.ModalTitle = "Approval Candidate";
    this.ActivateAddEditCandidateComp = true;
  }

  closeClick() {
    this.ActivateAddEditCandidateComp = false;
    this.closebutton.nativeElement.click();
    this.showCandidateList();
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.candidateService.deleteCandidate(item)
        .subscribe(
          res => {
            this.showCandidateList();
            this.toastr.success('Deleted successfully');
          },
          err => { console.log(err); }
        )
    }
  }

  findCachedItemById(value: number) {
    if (this.jobs == null || this.jobs.length === 0) { return ''; }
    for (const item of this.jobs) {
      if (item.id == value) {
        return item.jobName;
      }
    }
    return '';
  }

  getColor(val:any){
      if(val==null) return 'badge badge-warning'
      else if(val==true) return 'badge badge-success'
      else return 'badge badge-danger'
  }

}
