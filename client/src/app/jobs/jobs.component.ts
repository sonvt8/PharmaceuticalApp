import { Component, OnInit } from '@angular/core';
import ParticlesConfig from 'src/assets/json/particlesjs.json';
declare var particlesJS: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    particlesJS('particles-js', ParticlesConfig, function () {
      console.log('callback - particles.js config loaded');
    });
  }

}
