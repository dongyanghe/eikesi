import {PipeTransform, Pipe} from '@angular/core';
import {DICT} from '../../data/DICT';

/**
 * 字典翻译，将对应值转译为名称
 * 纯版，只检查对原始类型值(String、Number、Boolean、Symbol)的更改， 或者对对象引用(Date、Array、Function、Object)的更改，性能高
 */
@Pipe({
  name: 'valueToLabel'
})
export class ValueToLabelPipe implements PipeTransform {
  /**
   * 管道，过滤字典内容，例如：'sex': [ { 'label': '男', 'value': 1 },]
   * value | dict:'sex'
   * @param input：可用“,”分割
   * @param dictKey
   */
  transform(input: any, dictKey?: string, dataList?: Array<any>): any {
    try {
      if (!input && input !== 0) {
        return '';
      }
      if (!dictKey && (!dataList || !dataList.length)) {
        console.warn('dictKey和dataList必须至少传入一个');
        return '';
      }
      let resultStr = '';
      let prefix = '';
      let arr = [];
      if (isNaN(input)) {
        arr = input.split(',');
      } else {
        arr.push(input + '');
      }
      for (let k = 0; k < arr.length; k++) {
        if (arr[k] || arr[k] === 0) {
          let _array = dictKey ? DICT[dictKey] : dataList;  //   到此，是一个数组
          for (let j = 0; j < _array.length; j++) {
            let label_value = _array[j]; // 此对象必须是{'label':'_label','value':'_value'}
            let tmpArr = arr[k].split('-');
            if (!tmpArr[0] && tmpArr[0] !== 0) {
              tmpArr[0] = arr[k];
            }
            if (tmpArr[0] == label_value.value &&
              label_value.label) {
              resultStr += prefix + label_value.label;
              if (prefix === '') {
                prefix = ',';
              }
            }
          }
        }
      }
      return resultStr;
    } catch (e) {
      console.warn('获取 label:' + dictKey + ' 失败...');
      console.error(e);
    }
    return '';
  }
}

/**
 * 字典翻译，将对应值转译为名称
 * 非纯版，检查对象引用和各层级的值的改变，性能低
 */
@Pipe({
  name: 'valueToLabelImpure',
  pure: false
})
export class ValueToLabelImpurePipe extends ValueToLabelPipe implements PipeTransform {
}
