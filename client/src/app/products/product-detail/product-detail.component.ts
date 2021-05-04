import { Component, OnInit, OnDestroy  } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit, OnDestroy  {
  sub: Subscription;
  product: Product;
  descriptions: String[];
  properties: Map<string, string> = new Map();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          if (id) {
            this.productService.getProductById(id).subscribe(product => {
              console.log(product);
              this.product = product;
              this.descriptions = this.product.description.split("\n");
              this.properties.set("CapsuleSize", product.capsuleSize); 
              this.properties.set("Machine Dimension", product.machineDimension); 
              this.properties.set("Machine Size", product.machineSize); 
              this.properties.set("Max Pressure", product.maxPressure); 
              this.properties.set("Max Diameter", product.maxDiameter); 
              this.properties.set("MaxDepth", product.maxDepth); 
              this.properties.set("Net Weight", product.netWeight); 
              this.properties.set("Model Number", product.modelNumber);
              this.properties.set("OutPut", product.outPut); 
              this.properties.set("Dies", product.dies.toString()); 
              this.properties.set("Shipping Weight", product.shippingWeight); 
              this.properties.set("Production Capacity", product.productionCapacity);
            })
          }
        }
      );
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
