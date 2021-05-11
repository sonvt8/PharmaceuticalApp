import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import ParticlesConfig from 'src/assets/json/particlesjs.json';
declare var particlesJS: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  x : boolean = true;
  private sub: Subscription;
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    particlesJS('particles-js', ParticlesConfig, function () {
      console.log('callback - particles.js config loaded');
    });

    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(events => {
      this.x = this.route.snapshot.firstChild.data.x;
    });
  }

}
