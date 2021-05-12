import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AccountService } from 'src/app/_services/account.service';
import { FeedbackService } from '../_services/feedback.service';
import { User } from 'src/app/_models/user.model';
import { FeedBack } from '../_models/feedBack.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  subscription: Subscription;
  currentUser: User;

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService,
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

    this.feedbackForm = this.formBuilder.group({
      name: [this.currentUser.fullName, Validators.required],
      organization: ['', Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.feedbackForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.feedbackForm.invalid) {
        return;
    }
    this.loading = true;

    var feedback: FeedBack = {
      fullName : this.currentUser['fullName'],
      company : this.feedbackForm.controls['organization'].value,
      address : this.currentUser['streetAddress'],
      city : this.currentUser['city'],
      postalCode : this.currentUser['zip'],
      email : this.currentUser['email'],
      phone : this.currentUser['phoneNumber'],
      subject : this.feedbackForm.controls['subject'].value,
      comments : this.feedbackForm.controls['content'].value,
    };

    this.feedbackService.sendFeedback(feedback).subscribe(contactInfo => {
      this.toastr.success('Successfully sent! Your feedback would be considered by Admin if your profile has complete information');
      this.feedbackForm.reset();
      this.reload();
    },error => {
      this.toastr.error(error.error)
      this.loading = false;
    })
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

}
