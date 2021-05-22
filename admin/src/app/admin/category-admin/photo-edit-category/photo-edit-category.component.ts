import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Category } from 'src/app/_models/category';
import { PhotoCategory } from 'src/app/_models/photoCategory';
import { CategoryService } from 'src/app/_service/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-edit-category',
  templateUrl: './photo-edit-category.component.html',
  styleUrls: ['./photo-edit-category.component.css']
})
export class PhotoEditCategoryComponent implements OnInit {

  @Input() cate: Category;
  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  hasBaseDropzoneOver = false;
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: PhotoCategory, cate: Category) {
    this.categoryService.setMainPhoto(photo.id, cate.id).subscribe(() => {
      this.cate.photoCategoryUrl = photo.photoCategoryUrl;
      this.cate.photoCategories.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id == photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photo: PhotoCategory,  cate: Category) {
    this.categoryService.deletePhoto(photo.id, cate.id).subscribe(() => {
      this.cate.photoCategories = this.cate.photoCategories.filter(x => x.id !== photo.id);
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + '/categories/add-photo/' + this.cate.id,
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
        const photo: PhotoCategory = JSON.parse(response);
        this.cate.photoCategories.push(photo);
        if (photo.isMain) {
          this.cate.photoCategoryUrl = photo.photoCategoryUrl;
        }
      }
    }
  }

}
