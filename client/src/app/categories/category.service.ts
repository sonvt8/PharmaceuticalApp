import { Injectable,EventEmitter } from '@angular/core';
import { Product } from '../products/product.model';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categorySelected = new EventEmitter<Category>();

  private categories: Category[] = [
      new Category('Tablets Presses',
                  `
                    <p>LFA Tablet Press supplies, tablet, pill and pellet presses form R&D Hand Held models right up to full
                      production capacity Rotary Tablet Presses.</p>
                    <p>Some of our most popular models include the Desk Top Presses which are fantastic for research departments
                      and small batch production.</p>
                    <p>LFA Tablet Presses also supplies a small range of excipients that can be used in the tablet presses. This
                      includes Firmapress our all in one tableting excipient that works with almost every API.</p>
                  `,
                  [
                    new Product('product 1', 1, '../assets/img/tablet-presses.jpg'),
                    new Product('product 2', 2, '../assets/img/tablet-presses.jpg')
                  ]),
        new Category('Capsule Fillers',
                  `
                    <p>LFA Capsule Fillers supplies, capsule fillers from small production runs and research and development
                      models, that can do 100 capsules at a time, through to fully automatic capsule fullers for full-scale
                      production.</p>
                    <p>Launched in 2018 it is the latest addition to the LFA family. Despite this being the case our engineers
                      are fully trained on the machines and able to offer the same support and training that the would with
                      the mixers and tablet presses.</p>
                    <p>LFA Capsule Fillers also offers a complete range of capsules for you to use in your machine. From 000 to
                      5 we stock all of the regular sizes and are able to offer them in a range of colours and materials. We
                      are practically excited about the organic capsule that allows you as a producer to easily produce a
                      fully organic product.</p>
                  `,
                  [
                    new Product('product 3', 3, '../assets/img/capsule-fillers.jpg'),
                    new Product('product 4', 4, '../assets/img/capsule-fillers.jpg')
                  ]),
          new Category('Mixing Machinery',
                  `
                    <p>LFA Mixers is a fully comprehensive one stop shop for all of your powder mixing needs. With a range of
                      designs that includes V Mixers, Bin Mixers and Ribbon blenders whatever powder mixing challenges you’re
                      facing we are sure to be able to help.</p>
                    <p>Originally included in the LFA Tablet Presses range we decided to separate out LFA Mixers in 2017 as our
                      customer’s requirements became more diverse. Whether you’re mixing, capsule or tablet mixes, protein
                      powders or industrial chemicals we believe that we can supply you with a mixer that can take on the
                      challenge.</p>
                    <p>With over 10 years mixing powders we understand that every mix is different. We are happy to work with
                      you to find the right grade steal, add in agitation bars and validate different mixing methods,
                      essentially customising every mixer for your specific needs.</p>
                  `,
                  [
                    new Product('product 5', 5, '../assets/img/mixing-machinery.jpg'),
                    new Product('product 6', 6, '../assets/img/mixing-machinery.jpg')
                  ]),
  ];

  constructor() { }

  getCategories() {
    return this.categories.slice();
  }
}
