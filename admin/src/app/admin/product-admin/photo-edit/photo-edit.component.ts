import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { PhotoProduct } from 'src/app/_models/photoProduct';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {

  @Input() pro: Product;
  uploader: FileUploader;
  baseUrl = 'https://localhost:5001/api/products';
  hasBaseDropzoneOver = false;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: PhotoProduct, product: Product) {
    this.productService.setMainPhoto(photo.id, product.id).subscribe(() => {
      this.pro.photoProductUrl = photo.photoProductUrl;
      this.pro.photoProducts.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id == photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photo: PhotoProduct,  product: Product) {
    this.productService.deletePhoto(photo.id, product.id).subscribe(() => {
      this.pro.photoProducts = this.pro.photoProducts.filter(x => x.id !== photo.id);
    })
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
