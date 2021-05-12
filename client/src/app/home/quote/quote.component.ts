import { Component, OnInit, Input } from '@angular/core';
import { UserFeedback } from 'src/app/_models/userFeedback.model';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  @Input() usersFeedback: UserFeedback;

  constructor() { }

  ngOnInit(): void {
  }

}
