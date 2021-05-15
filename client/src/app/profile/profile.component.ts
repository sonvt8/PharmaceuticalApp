import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url: string = '';
  currentUser: User;
  isDefaultImage: boolean = false;
  fileToUpload: File = null;

  public items = [
    {
      name: 'Profile Detail',
      path: 'detail'
    },
    {
      name: 'Change Password',
      path: 'change-password'
    },
    {
      name: 'Manage Resumes',
      path: 'resumes'
    }
  ];

  username: string;
  selectedIndex: number = 0;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.accountService.user.subscribe(user => {
      try {
        this.currentUser = user;
      } catch {
      }
    });
  }

  ngOnInit(): void {
    if(this.currentUser.photoUserUrl == null){
      this.currentUser.photoUserUrl = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=300';
      this.isDefaultImage = true;
    } 
  }


  select(index: number) {
    this.selectedIndex = index;
  }

  onSelectFile(files: FileList) {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = files[0];

    var reader = new FileReader();

    reader.readAsDataURL(this.fileToUpload); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result as string;
    }

    const formData: FormData = new FormData();
    formData.append('name', this.currentUser['fullName'] + "_avatar");
    formData.append('avatar', this.fileToUpload);

    if(this.isDefaultImage){
      this.accountService.uploadProfileImage(formData).subscribe(response => {
        if(response)  {
          this.toastr.success('Your avatar has been updated successfully!!');
          // this.reload();
        }
      },error => {
        this.toastr.error(error.error)
      })
    }else{
      this.accountService.editProfileImage(formData,this.currentUser['photoUserId']).subscribe(response => {
        if(response)  {
          this.toastr.success('Your avatar has been updated successfully!!');
        }
      },error => {
        this.toastr.error(error.error)
      })
    }
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

}
