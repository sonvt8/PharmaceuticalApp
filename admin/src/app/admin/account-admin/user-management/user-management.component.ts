import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  search = "";
  users: User[] = []
  user: User
  ModalTitle: string
  ActivateAddEditUserComp = false;
  public CloseClickCallback: Function;
  @ViewChild('closebutton') closebutton;

  constructor(public accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showUserList();
    this.CloseClickCallback = this.closeClick.bind(this);
  }

  showUserList() {
    this.accountService.resetList(this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.users = res.result;
      this.pagination = res.pagination;
    })

  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.showUserList();
  }

  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.showUserList();
  }

  addClick() {
    this.user = new User();
    this.ModalTitle = "Add User";
    this.ActivateAddEditUserComp = true;
  }

  editClick(item: any) {
    this.user = item;
    this.ModalTitle = "Update User";
    this.ActivateAddEditUserComp = true;
  }

  closeClick() {
    this.ActivateAddEditUserComp = false;
    this.closebutton.nativeElement.click();
    this.showUserList();
  }

}
