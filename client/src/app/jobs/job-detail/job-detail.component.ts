import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  currentUser: User;

  constructor(private accountService : AccountService, private modalService: NgbModal) { 
    this.accountService.user.subscribe(x => {
      this.currentUser = x;

    });
  }

  ngOnInit(): void {
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
