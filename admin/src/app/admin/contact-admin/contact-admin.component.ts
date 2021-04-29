import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Contact } from 'src/app/_models/contact';
import { ContactService } from 'src/app/_service/contact.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {}
  contacts: Contact[] = []
  contact: Contact
  ModalTitle: string
  ActivateAddEditContComp = false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.showContacttList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showContacttList() {
    this.contactService.resetList().subscribe(res => {
      this.contacts = res as Contact[];
      this.dtTrigger.next();
    })

  }


  addClick() {
    this.contact = new Contact();
    this.ModalTitle = "Add Contact";
    this.ActivateAddEditContComp = true;
  }

  editClick(item: any) {
    this.contact = item;
    this.ModalTitle = "Update Contact";
    this.ActivateAddEditContComp = true;
  }

  closeClick() {
    this.ActivateAddEditContComp = false;
    this.closebutton.nativeElement.click();
    this.contactService.resetList().subscribe(res => {
      this.contacts = res as Contact[];
    })
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.contactService.deleteContact(item)
        .subscribe(
          res => {
            this.contactService.resetList().subscribe(res => {
              this.contacts = res as Contact[];
            })
            this.toastr.success('Deleted successfully');
          },
          err => { console.log(err); }
        )
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
