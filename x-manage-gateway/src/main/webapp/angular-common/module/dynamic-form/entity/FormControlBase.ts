import {FormItemColSize} from './FormItemColSize';
import {HttpService} from '../../../service/HttpService';
import {EditDynamicTable} from './index';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
export class FieldBaseOptions {
  type?: string;
  dataList?: Array<any>;
  httpService?: HttpService;
  callback?: any;
}
export class FormControlBase<T> {
  value:  Array<any> | any ;
  private keys: string;
  key: string;
  keyList: Array<string>;
  label: string;
  controlType: string;
  controlTypes?: string;
  placeholder: string;
  required: boolean = false;
  readonly: boolean = false;
  disabled: boolean = false;
  title?: string;
  options?: FieldBaseOptions;
  minlength?: number;
  maxlength?: number;
  order?: number;
  formItemColSize?: FormItemColSize;
  validation?: string;
  constructor(controlType: string, label: string, placeholder: string, keys: string | Array<string>, value:  Array<any> | any , options?: FieldBaseOptions, required: boolean = false, readonly: boolean = false,  disabled: boolean = false, validation: string = '', minlength?: number, maxlength?: number, title?: string, order?: number, formItemColSize: FormItemColSize = new FormItemColSize() ) {
    this.label = label;
    this.placeholder = placeholder || this.label;
    this.value = value;
    this.controlType = controlType;
    this.required = required;
    this.readonly = readonly;
    this.disabled = disabled;
    this.validation = validation;
    this.minlength = minlength;
    this.maxlength = maxlength;
    this.order = order;
    this.options = options;
    this.formItemColSize = formItemColSize;
    //  设置本组件formGroup的key和父级的key
    if (typeof keys == 'string') {
      this.keyList = keys.split('.');
    }
    if (keys instanceof Array) {
      this.keyList = keys;
    }
    this.key = this.keyList[this.keyList.length - 1];
    //  提示
    if (this.required && (this.readonly || this.disabled)) {
      console.warn('required为true时readonly和disabled建议为false，可避免无法赋值导致不能提交表单');
    }
  }

}
