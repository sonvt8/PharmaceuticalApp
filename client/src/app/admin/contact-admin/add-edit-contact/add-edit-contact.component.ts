import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css']
})
export class AddEditContactComponent implements OnInit {

  @Input() contact: any;
  ModalTitle:string
  ContactId: number;
  ContactName: string;
  ContactEmail: string;
  ContactPhone: string;
  ContactCountry: string;
  ContactDescription: string;
  
  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.ContactId = this.contact.id;
    this.ContactName = this.contact.name;
    this.ContactEmail = this.contact.email;
    this.ContactPhone = this.contact.phone;
    this.ContactCountry = this.contact.country;
    this.ContactDescription = this.contact.description;
  }

  addContact() {
    var val = {
      id: this.ContactId,
      name: this.ContactName,
      email: this.ContactEmail,
      phone: this.ContactPhone,
      country: this.ContactCountry,
      description: this.ContactDescription
    };
    
    this.contactService.addContact(val).subscribe(res => {
      this.router.navigateByUrl('/contact-admin');
    }, error => {
      console.log(error);
    });
  }

  updateCategory() {
    var val = {
      id: this.ContactId,
      name: this.ContactName,
      email: this.ContactEmail,
      phone: this.ContactPhone,
      country: this.ContactCountry,
      description: this.ContactDescription
    };
    this.contactService.updateContact(val).subscribe(res => {
      this.router.navigateByUrl('/contact-admin');
    }, error => {
      console.log(error);
    });
  }

}
