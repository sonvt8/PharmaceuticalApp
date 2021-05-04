import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/_models/contact';
import { ContactService } from 'src/app/_service/contact.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css']
})
export class AddEditContactComponent implements OnInit {

  @Input() contact: Contact;
  @Input()
  public myCallback: Function;
  ModalTitle: string

  constructor(public contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.contact.id == 0) {
      this.insertRecord();
    }
    else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.contactService.postContact(this.contact).subscribe(
      res => {
        this.myCallback();
        this.toastr.success('Added successfully');
      },
      err => { console.log(err); }
    )
  }

  updateRecord() {
    this.contactService.putContact(this.contact).subscribe(
      res => {
        this.myCallback();
        this.toastr.info('Updated successfully');
      },
      err => { console.log(err); }
    )
  }


}
