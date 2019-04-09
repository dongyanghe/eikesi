import {FormControlBase} from './FormControlBase';
import {FormItemColSize} from './FormItemColSize';
import { Label } from './label';
import {Observable, Observer} from 'rxjs';

export class TextGroup extends FormControlBase<string> {
  type: string;
  observable: Observable<any>;
  private observer: Observer<any>;
  onBefore: string; // 前置
  onAfter: string; // 后置
  /**
   * 自适应内容高度，可设置为 true|false 或对象：{ minRows: 2, maxRows: 6 }
   */
  nzAutosize?: Boolean|Object;
  /**
   * 控制固定框的行数
   */
  nzRows?: string;
/**
 * 前/后 配置
 *   beforeWord? 前置文字
 *
  afterWord? 后置文字

  beforeIcon? 前置图标

  afterIcon? 后置图标

 * beforeSelect? 前置下拉文字选项
 *
 * afterSelect? 后置下拉文字选项
 *
 */
  beforeWord?: string ;
  afterWord?: string ;
  beforeIcon?: string ;
  afterIcon?: string ;
  eventType?: string ;
  beforeSelect?: Array<{
    label: string,
    value: string
  }> ;
  afterSelect?: Array<{
    label: string,
    value: string
  }> ;
  callbackfun?: any;
  constructor(label: string, placeholder, keys: string, value: any = '', type: string = 'text', required: boolean = false, readonly: boolean = false, disabled: boolean = false, validation: string = '',
              beforeWord?: string, afterWord?: string, beforeIcon?: string, afterIcon?: string, beforeSelect?: Array<any>, afterSelect?: Array<any>, minlength?: number,
              maxlength?: number, title?: string, order?: number, formItemColSize?: FormItemColSize) {
    super('textgroup', label, placeholder, keys, value, null, required, readonly, disabled, validation, minlength, maxlength, title, order, formItemColSize);
    this.type = type;
    this.beforeWord = beforeWord;
    this.afterWord = afterWord;
    this.beforeIcon = beforeIcon;
    this.afterIcon = afterIcon;
    this.beforeSelect = beforeSelect;
    this.afterSelect = afterSelect;
    this.observable = Observable.create(observer => {
      this.observer = observer;
    });
  }
  onAfterClick() {
    let self = this;
    self.observer.next({
      type: 'after',
      key: self.key,
      value: self.value
    });
  }
}
