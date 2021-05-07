import { Component, OnInit } from '@angular/core';
import countries from 'src/assets/json/countries.json';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  public countries:{Name: string, Code: string} = countries;

  constructor() { }

  ngOnInit(): void {
  }

  url: string;

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
