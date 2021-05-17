import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

import { MustMatch } from '../../_helpers/must-match.validator';
import { UserRegister } from 'src/app/_models/userRegister.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  show_button: Boolean = false;
  show_eye: Boolean = false;
  show_button_confirm: Boolean = false;
  show_eye_confirm: Boolean = false;

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  showConfirmPassword() {
    this.show_button_confirm = !this.show_button_confirm;
    this.show_eye_confirm = !this.show_eye_confirm;
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['male', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.loading = true;

    var user: UserRegister = {
      fullName: this.registerForm.get('firstName').value + " " + this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      gender:this.registerForm.get('gender').value,
      password:this.registerForm.get('password').value
    };

    this.accountService.register(user).subscribe(response => {
      console.log(response)
      this.toastr.success('You have registered successfully');
      this.router.navigate(['../login'], { relativeTo: this.route });
    },error => {
      this.toastr.error(error.error)
      this.loading = false;
    })
  }
}
