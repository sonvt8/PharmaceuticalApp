import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

import { resetPassword } from 'src/app/_models/resetPassword.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  recoveryPwdForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.recoveryPwdForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.recoveryPwdForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.recoveryPwdForm.invalid) {
        return;
    }
    this.loading = true;

    var resetPassword: resetPassword = {
      password: "",
      confirmedPassword: "",
      token: "",
      email: this.recoveryPwdForm.get('email').value
    };

    this.accountService.sendTokenToEmail(resetPassword).subscribe(response => {
      this.toastr.success('The link has been sent, please check your email to reset your password');
      this.router.navigate(['../login'], { relativeTo: this.route });
    },error => {
      this.toastr.error(error.error);
      this.loading = false;
    })
  }

}
