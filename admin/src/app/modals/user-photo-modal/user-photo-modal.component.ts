import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { PhotoUser } from 'src/app/_models/photoUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_service/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-photo-modal',
  templateUrl: './user-photo-modal.component.html',
  styleUrls: ['./user-photo-modal.component.css']
})
export class UserPhotoModalComponent implements OnInit {

  @Input() user: User;
  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  hasBaseDropzoneOver = false;
  
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: PhotoUser, user: User) {
    this.accountService.setMainPhoto(photo.id, user.id).subscribe(() => {
      this.user.photoUserUrl = photo.photoUserUrl;
      this.user.photoUsers.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id == photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photo: PhotoUser,  product: User) {
    this.accountService.deletePhoto(photo.id, product.id).subscribe(() => {
      this.user.photoUsers = this.user.photoUsers.filter(x => x.id !== photo.id);
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + '/admin/add-photo/' + this.user.id,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: PhotoUser = JSON.parse(response);
        this.user.photoUsers.push(photo);
        if (photo.isMain) {
          this.user.photoUserUrl = photo.photoUserUrl;
        }
      }
    }
  }

}
