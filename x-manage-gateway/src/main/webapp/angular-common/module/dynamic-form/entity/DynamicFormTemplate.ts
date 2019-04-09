import {FormControlBase, FieldBaseOptions} from './FormControlBase';
import {NZFormRow} from './NZFormRow';
export class DynamicFormTemplate {
  /**
   * 控件列表
   * @type {Array}
   */
  formControlList: FormControlBase<any>[] = [];
  /**
   * 模版类型
   */
  type?: string;
  title?: string;
  msg?: string;
  /**
   * 公共栅格配置
   */
  nzFormRow?: NZFormRow;

  constructor(title: string = '', msg: string = '', type: string = '', formControlList: FormControlBase<any>[], nzFormRow?: NZFormRow) {
    this.title = title;
    this.msg = msg;
    this.type = type;
    this.formControlList = formControlList;
    this.nzFormRow = nzFormRow;
  }
}


