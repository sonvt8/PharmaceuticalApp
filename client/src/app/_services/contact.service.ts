import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private readonly http: HttpClient) { }

  sendContact(contact: Contact) {
    return this.http.post<Contact>(`${environment.apiUrl}/contacts`, contact);
  }
}
