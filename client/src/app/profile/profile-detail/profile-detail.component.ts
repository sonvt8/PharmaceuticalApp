import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AccountService } from 'src/app/_services/account.service';
import countriesLbr from 'src/assets/json/countries.json';
import { User } from 'src/app/_models/user.model';
import { Country } from 'src/app/_models/country.model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  submitted: boolean = false;
  url: string = '';
  isEdited: string = '';
  isDefaultImage: boolean = false;
  fileToUpload: File = null;
  files: Array<any> = new Array<any>();

  profileForm: FormGroup;
  countries: Country[] = countriesLbr;
  currentUser: User;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
    this.subscription = this.accountService.user
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        }
      );

    if(this.currentUser.photoUserUrl == null){
      this.currentUser.photoUserUrl = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=300';
      this.isDefaultImage = true;
    } 
    
    this.profileForm = this.formBuilder.group({
      fullname: [this.currentUser.fullName, Validators.required],
      gender: [this.currentUser.gender , Validators.required],
      address: this.currentUser.streetAddress,
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      city: this.currentUser.city,
      state:this.currentUser.state,
      zip: [this.currentUser.zip, Validators.pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)],
      phone: this.currentUser.phoneNumber,
      lstCountries: this.currentUser.country
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  onSubmit(){
    if(this.isEdited != ''){
      return;
    }

    if(!this.profileForm.dirty) {
      this.toastr.info("Nothing changed in your form!");
      return;
    }

    this.currentUser['fullName'] = this.profileForm.controls['fullname'].value;
    this.currentUser['email'] = this.profileForm.controls['email'].value;
    this.currentUser['gender'] = this.profileForm.controls['gender'].value;
    this.currentUser['streetAddress'] = this.profileForm.controls['address'].value;
    this.currentUser['state'] = this.profileForm.controls['state'].value;
    this.currentUser['city'] = this.profileForm.controls['city'].value;
    this.currentUser['country'] = this.profileForm.controls['lstCountries'].value;
    this.currentUser['phoneNumber'] = this.profileForm.controls['phone'].value;
    this.currentUser['zip'] = this.profileForm.controls['zip'].value;

    this.accountService.update(this.currentUser).subscribe(response => {
      if(response)  {
        this.toastr.success('Your profile has been updated successfully');
        this.router.navigate(['../back'], { relativeTo: this.route });
      }
    },error => {
      this.toastr.error(error.error)
      this.loading = false;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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

    if(this.isDefaultImage){
      this.isEdited = 'uploaded';
    }else{
      this.isEdited = 'edited';
    }
  }

  onUploadFile(){

    const formData: FormData = new FormData();
    formData.append('name', this.currentUser['fullName'] + "_avatar");
    formData.append('avatar', this.fileToUpload);

    if(this.isEdited == 'uploaded'){
      this.accountService.uploadProfileImage(formData).subscribe(response => {
        if(response)  {
          this.currentUser['photoUserUrl'] = response.photoUserUrl;
          this.currentUser['photoUserId'] = response.id;
          console.log(this.currentUser)
          this.toastr.success('Successfully!!');
          this.isEdited = 'edited';
          this.reload();
        }
      },error => {
        this.toastr.error(error.error)
      })
    }else{
      console.log("do replace image")
    }
    
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  public delete() {
    this.url = null;
  }
}
