import {Injectable} from '@angular/core';


@Injectable()
export class UnitConverService {
  /**
   * value       传进的普通值，传进的对象、数组、方法等返回0
   * targetType  最终转换的类型: yuan(元，保留两位小数) cent(分，整数) 
   * unit        后缀的单位    
   */
  switchType(value, targetType, unit?: string) {
    let resultValue: any;
    let valueType = (typeof value);
    if ((valueType === 'number') || (valueType === 'string')) {
      switch (targetType) {
        case 'yuan':
          resultValue = this.centToYuan(value);
          break;
        case 'cent':
          resultValue = this.yuanToCent(value);
          break;
        default:
          resultValue = 0;
      }
    } else {
      resultValue = 0;
    }
    return unit ? resultValue + unit : resultValue;
      
  }

  
  // 元转分
  yuanToCent(value) {
    let result = parseFloat(value);
    result = result * 100;
    return result;
  }
  // 分转元
  centToYuan(value) {
    let result = parseFloat(value);
    result = result / 100;
    return result.toFixed(2);
  }
 
}
