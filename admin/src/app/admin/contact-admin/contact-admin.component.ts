import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Contact } from 'src/app/_models/contact';
import { Pagination } from 'src/app/_models/pagination';
import { ContactService } from 'src/app/_service/contact.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {

  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  search = "";
  contacts: Contact[] = []
  contact: Contact
  ModalTitle: string
  ActivateAddEditContComp = false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;

  constructor(public contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showContactList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showContactList() {
    this.contactService.resetList(this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.contacts = res.result;
      this.pagination = res.pagination;
    })

  }
  
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.showContactList();
  }

  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.showContactList();
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
    this.showContactList();
  }

  deleteClick(item: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.contactService.deleteContact(item)
        .subscribe(
          res => {
            this.showContactList();
            this.toastr.success('Deleted successfully');
          },
          err => { console.log(err); }
        )
    }
  }

}
