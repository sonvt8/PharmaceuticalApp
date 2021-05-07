import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from 'src/app/_services/account.service';
import countriesLbr from 'src/assets/json/countries.json';
import { User } from 'src/app/_models/user.model';
import { Country } from 'src/app/_models/country.model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  // countries:{Name: string, Code: string};
  

  profileForm: FormGroup;
  loading = false;
  submitted = false;
  url: string;
  countries: Country[] = countriesLbr;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      gender: ['female', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: [''],
      state: [''],
      zip: ['', Validators.pattern(/^[1-9]+[0-9]*$/)],
      phone: [''],
      lstCountries: [null]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  onSubmit(){
    console.log("Form Submitted")
    console.log(this.countries)
    console.log(this.profileForm.value)
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
