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
  url: string;

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
    // this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.subscription = this.accountService.user
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        }
      );
    
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
      }
    }
  }

  public delete() {
    this.url = null;
  }
}
