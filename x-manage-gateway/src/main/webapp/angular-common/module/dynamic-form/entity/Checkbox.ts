import {FormControlBase, FieldBaseOptions} from './FormControlBase';
import {DICT} from '../../../../data/DICT';
export class Checkbox extends FormControlBase<string> {
  dictName: string;
  dataList: Array<any>;
  labelKey?: string;
  valueKey?: string;
  constructor(label: string, placeholder: string = '请选择', key: string, value: any, dataList: Array<any>, labelKey: string = 'label', valueKey: string = 'value', required: boolean = false, readonly: boolean = false, disabled: boolean = false, validation: string = '', minlength?: number, maxlength?: number, title?: string, order?: number) {
    super('checkbox', label, placeholder, key, value, undefined, required, readonly, disabled, validation, minlength, maxlength, title, order);
    const self = this;
    self.dataList = dataList;
    self.labelKey = labelKey;
    self.valueKey = valueKey;
  }
}
