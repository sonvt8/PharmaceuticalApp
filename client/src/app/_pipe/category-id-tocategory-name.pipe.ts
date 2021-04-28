import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../_model/category.model';
import { CategoryService } from '../_services/category.service';

@Pipe({
  name: 'categoryIdTocategoryName'
})
export class CategoryIdTocategoryNamePipe implements PipeTransform {

  constructor(private categoryService: CategoryService) {

   }

  transform(value: number): any {
    if (this.categoryService.list == null) { return 'Data is not cached (put your own message there)'; }

  return this.categoryService.list.find(item => item.id === value) ?
    this.categoryService.list.find(item => item.id === value).categoryName :
    'No cached data found (put your own message there)';
  }

}
