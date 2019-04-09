import {FormControlBase} from './FormControlBase';
import {FormItemColSize} from './FormItemColSize';
import { Label } from './label';
export class Textbox extends FormControlBase<string> {
  type: string; //  textarea text number
  /**
   * 自适应内容高度，可设置为 true|false 或对象：{ minRows: 2, maxRows: 6 }
   */
  nzAutosize?: Boolean|Object;
  /**
   * 控制固定框的行数
   */
  nzRows?: string;


  constructor(label: string, placeholder, key: string, value: any = '', type: string = 'text', required: boolean = false, readonly: boolean = false, disabled: boolean = false, validation: string = '', minlength?: number, maxlength?: number, title?: string, order?: number, formItemColSize?: FormItemColSize) {
    super('textbox', label, placeholder, key, value, null, required, readonly, disabled, validation, minlength, maxlength, title, order, formItemColSize);
    this.type = type;

  }
}
