import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  isCollapsed = true;
  starRating = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
