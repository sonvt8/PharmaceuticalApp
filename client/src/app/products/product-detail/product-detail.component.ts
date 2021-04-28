import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isCollapsed = true;
  starRating = 0; 

  constructor() { }

  ngOnInit(): void {
  }

  Images: Array<object> = [
    {
      src: 'https://www.lfatabletpresses.com/media/catalog/product/cache/2d6735ae975a35971640ff95cc4716ba/l/f/lfa-tdp-5-updated-version-side.webp',
      alt: 'Image 1',
    }, {
      src: 'https://www.lfatabletpresses.com/media/catalog/product/cache/2d6735ae975a35971640ff95cc4716ba/l/f/lfa-tdp-5-rear-view.webp',
      alt: 'Image 2'
    }, {
      src: 'https://www.lfatabletpresses.com/media/catalog/product/cache/2d6735ae975a35971640ff95cc4716ba/l/f/lfa-tdp-5-lfa-logo-view.webp',
      alt: 'Image 3'
    }, {
      src: 'https://www.lfatabletpresses.com/media/catalog/product/cache/2d6735ae975a35971640ff95cc4716ba/l/f/lfa-tdp-5-flywheel-view.-2.webp',
      alt: 'Image 4'
    }, {
      src: 'https://www.lfatabletpresses.com/media/catalog/product/cache/2d6735ae975a35971640ff95cc4716ba/l/f/lfa-tdp-5-front-view.webp',
      alt: 'Image 5'
    }, {
      src: 'https://www.lfatabletpresses.com/media/catalog/product/cache/2d6735ae975a35971640ff95cc4716ba/l/f/lfa-tdp-5-flywheel-view.webp',
      alt: 'Image 6'
    }
  ]

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
    speed: 800,
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
      shadowOffset: 40,
      shadowScale: 0.94,
    }
  };

}
