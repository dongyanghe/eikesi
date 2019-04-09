import {FormControlBase, FieldBaseOptions} from './FormControlBase';

import {HttpService} from '../../../service/HttpService';
/**
 * 数据字典配置类
 */
import {DICT} from '../../../../data/DICT';

export class SelectButton extends FormControlBase<string> {
  controlType = 'selectButton';
  dictName: string;
  dataList: Array<any>;

  constructor(label: string, placeholder: string = '请选择', key: string,value: any, options: FieldBaseOptions,required: boolean = false, readonly: boolean = false, disabled: boolean = false, validation: string = '', minlength?: number, maxlength?: number, title?: string, order?: number) {
    super('selectButton', label, placeholder, key, value,  options,required, readonly, disabled, validation, minlength, maxlength, title, order);
    let self = this;
    this.dictName = options['dictName'] || '';
    this.dataList = options['dataList'] || [];
    //  没有dataList的自动赋值
    if (!self.dataList
      || !self.dataList.length) {
      console.log(self.dataList);
      self.dataList = [];
      let dataList = DICT[self.dictName];
      //  如果字典有该字段则取字典
      if (dataList) {
        self.dataList = dataList;
      } else {//  后台请求获取下拉列表数据
        switch (self.dictName) {
          case 'business':
            if (!options.httpService) {
              console.error('http not found');
              self.dataList = [];
              break;
            }
            //  http请求数据后赋值给dataList
            self.dataList = [{
              'value': 'all',
              'label': '全部'
            }];
            break;
        }
      }
    }
  }
}
