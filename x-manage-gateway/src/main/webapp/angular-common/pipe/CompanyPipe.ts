import {PipeTransform, Pipe} from '@angular/core';
import { DICT } from '../../data/DICT';

@Pipe({
  name: 'company'
})
export class CompanyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    const companys = DICT.company;
    for (const company of companys) {
      if (value == company.value) {
        return company.label;
      }
    }
    return '';
  }

}
