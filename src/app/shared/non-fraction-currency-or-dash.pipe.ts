import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'nonFractionCurrencyOrDash'
})
export class NonFractionCurrencyOrDashPipe extends CurrencyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value)
      return super.transform(value, 'RUB', 'symbol', '1.0-0', 'ru');
    else
      return '-';
  }

}
