import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-add-edit-job',
  templateUrl: './add-edit-job.component.html',
  styleUrls: ['./add-edit-job.component.css']
})
export class AddEditJobComponent implements OnInit {

  @Input() job: any;
  @Input()
  public myCallback: Function;
  ModalTitle: string

  JobId: number
  JobName: string
  Description: string
  Salary: number
  Quantity: number
  IsAvailable: boolean

  constructor(public jobService: JobService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.JobId = this.job.id;
    // this.JobName = this.job.jobName;
    // this.Description = this.job.description;
    // this.Salary = this.job.salary;
    // this.Quantity = this.job.quantity
  }
  onSubmit() {
    if (this.job.id == 0) {
      this.insertRecord();
    }
    else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.jobService.postJob(this.job).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Submitted successfully');
      },
      err => { console.log(err); }
    )
  }

  updateRecord() {
    this.jobService.putJob(this.job).subscribe(
      res => {
        this.myCallback();
        this.toastr.info('Updated successfully');
      },
      err => { console.log(err); }
    )
  }

  onChanged(value: boolean) {
    this.job.isAvailable = value;
  }
}
