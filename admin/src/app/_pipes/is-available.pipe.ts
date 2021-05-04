import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAvailable'
})
export class IsAvailablePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? "Available" : "Expired";
  }
}
