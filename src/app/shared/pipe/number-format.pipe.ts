import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    return formatNumber(Number(value), 'en-US');
  }

}
