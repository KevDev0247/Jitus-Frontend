import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'repairStatus',
})
export class RepairStatusPipe implements PipeTransform {

  transform(value: number, args: any[]): any {
    if (value === 1) {
      return 'Awaiting';
    } else if (value === 2) {
      return 'Received';
    } else if (value === 3) {
      return 'Dispatched';
    } else if (value === 4) {
      return 'Repairing';
    } else if (value === 5) {
      return 'Completed';
    } else if (value === 6) {
      return 'Feedbacking';
    } else if (value === 7) {
      return 'Reviewing';
    } else {
      return '';
    }
  }
}
