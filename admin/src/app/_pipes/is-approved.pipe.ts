import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isApproved'
})
export class IsApprovedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == null) return "pending";
    else if (value == false) return "Reject";
    else return "Appove";
  }

}
