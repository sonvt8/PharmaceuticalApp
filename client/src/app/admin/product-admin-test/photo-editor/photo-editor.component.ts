import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { PhotoProduct } from 'src/app/_model/photoProduct';
import { Product } from 'src/app/_model/product';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() pro: Product;
  uploader: FileUploader;
  baseUrl = 'http://localhost:22566/api/products';
  hasBaseDropzoneOver = false;
  
  constructor() { }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + '/add-photo/' + this.pro.id,
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
        const photo: PhotoProduct = JSON.parse(response);
        this.pro.photoProducts.push(photo);
        if (photo.isMain) {
          this.pro.photoProductUrl = photo.photoProductUrl;
        }
      }
    }
  }

}
