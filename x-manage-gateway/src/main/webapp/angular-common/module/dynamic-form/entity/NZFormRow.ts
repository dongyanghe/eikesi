import {FormItemColSize} from './FormItemColSize';
export class NZFormRow {
  formItemCol: FormItemColSize;
  constructor(formItemCol: FormItemColSize = new FormItemColSize()) {
    this.formItemCol = formItemCol || this.formItemCol;
  }
}
