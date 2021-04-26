import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {}
  contacts: any[] = []
  contact: any
  ModalTitle:string
  ActivateAddEditContactComp=false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public contactService: ContactService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.showContactList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showContactList(){
    this.contactService.getContactList().subscribe(res=>{
      this.contacts = res,
      this.dtTrigger.next();
    })
    
  }

  
  addClick(){
    this.contact={
      Id:0,
      Name:"",
      Email:"",
      Phone:"",
      Country:"",
      Description:"",
    }
    this.ModalTitle="Add Contact";
    this.ActivateAddEditContactComp=true;
  }

  editClick(item: any){
    this.contact=item;
    this.ModalTitle="Edit Contact";
    this.ActivateAddEditContactComp=true;
  }

  closeClick(){
    this.ActivateAddEditContactComp=false;
    this.closebutton.nativeElement.click();
    this.contactService.getContactList().subscribe(res=>{   
      this.contacts = res;
    })
  }

  deleteClick(item: any){
    if(confirm('Are you sure')){
      this.contactService.deleteContact(item).subscribe(res=>{
        //this.toastr.error("Deleted successfully");
        this.contactService.getContactList().subscribe(res=>{
          this.contacts = res;
        })
      },error=>{
        //this.toastr.error("Deleted unsuccessfully");
        console.log(error);
      });
      
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
