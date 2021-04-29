import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

import { resetPassword } from 'src/app/_models/resetPassword.model';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  show_button: Boolean = false;
  show_eye: Boolean = false;
  show_button_confirm: Boolean = false;
  show_eye_confirm: Boolean = false;

  newPwdForm: FormGroup;
  loading = false;
  submitted = false;

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  showConfirmPassword() {
    this.show_button_confirm = !this.show_button_confirm;
    this.show_eye_confirm = !this.show_eye_confirm;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.newPwdForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newPwdForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newPwdForm.invalid) {
      return;
    }
    this.loading = true;

    var storedresetPassword: resetPassword = JSON.parse(localStorage.getItem('recoveryPassword'));

    var resetPassword: resetPassword = {
      password: this.newPwdForm.get('password').value,
      confirmedPassword: this.newPwdForm.get('confirmPassword').value,
      token: storedresetPassword.token,
      email: storedresetPassword.email
    };

    this.accountService.resetPassword(resetPassword).subscribe(response => {
      this.toastr.success('Your password has been reset');
      localStorage.removeItem('recoveryPassword');
      this.router.navigate(['../login'], { relativeTo: this.route });
    },error => {
      this.toastr.error(error.error);
      this.loading = false;
    })
  }

}
