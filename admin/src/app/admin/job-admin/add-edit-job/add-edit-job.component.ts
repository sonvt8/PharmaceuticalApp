import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/_service/job.service';

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

  constructor(public jobService: JobService, private toastr: ToastrService) { }

  ngOnInit(): void {
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
