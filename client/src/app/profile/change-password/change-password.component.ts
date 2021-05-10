import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from 'src/app/_services/account.service';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ChangePassword } from 'src/app/_models/changePassword.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loading: boolean = false;
  submitted: boolean = false;
  pwdChangedForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.pwdChangedForm = this.formBuilder.group({
      oldPwd: ['', [Validators.required, Validators.minLength(6)]],
      newPwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('newPwd', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.pwdChangedForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.pwdChangedForm.invalid) {
        return;
    }
    this.loading = true;

    var pwd: ChangePassword = {
      oldPassword: this.pwdChangedForm.controls['oldPwd'].value,
      newPassword: this.pwdChangedForm.controls['newPwd'].value,
      email: this.accountService.userValue.email
    };

    this.accountService.changePassword(pwd).subscribe(response => {
      this.toastr.success('Your password has been changed successfully!');
      this.router.navigate(['../login'], { relativeTo: this.route });
    },error => {
      this.toastr.error(error.error)
      this.loading = false;
    })
  }

}
