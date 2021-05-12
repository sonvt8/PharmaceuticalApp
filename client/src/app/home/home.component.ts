import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { UserFeedBack } from '../_models/userFeedBack.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: UserFeedBack[]
  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
    this.showUserFeedBack();
  }

  showUserFeedBack(){
    this.accountService.getUserFeedBack().subscribe(res=>{
      this.users = res as UserFeedBack[]
    })
  }


  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true,
    effect: 'coverflow',
    coverflowEffect: {
      slideShadows: true,
      rotate: 15,
      stretch: 15,
      depth: 5,
      modifier: 5
    }
  };

}
