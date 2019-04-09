import {Injectable} from '@angular/core';
import {FormControl, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {
  DynamicFormTemplate,
  FormControlBase,
  EditDynamicTableCol,
  EditDynamicTable
} from '../module/dynamic-form/entity';

@Injectable()
export class UtilityService {
  /**
   * @Title 判断空
   * @Description 判断空
   * @author hedongyang
   * @param val
   * @returns {Boolean} 空返回true
   */
  static isEmpty(val) {
    if (typeof val === 'string' || val instanceof String) {
      val = val.replace(/\s/g, '');
    }
    if (val === null) {
      return 1;
    }
    if (val === undefined || val === 'undefined') {
      return 1;
    }
    if (val === '') {
      return 1;
    }
    if (val.length === 0) {
      return 1;
    }
    if (!/[^(^\s*)|(\s*$)]/.test(val)) {
      return 1;
    }
    return 0;
  };

  /**
   * 判断obj对象是否没有属性
   * 空返回true
   * @param obj 只接收obj
   * @returns {boolean}
   */
  static isEmptyProperty(obj) {
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        return 0;  //  不为空返回false
      }
    }
    return 1;  //  空返回true
  }

  /**
   * str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
   * @param str
   * @param flg
   * @param sn
   */
  static insertFlg(str, flg, sn) {
    let newstr = '';
    for (let i = 0; i < str.length; i += sn) {
      let tmp = str.substring(i, i + sn);
      newstr += tmp + flg;
    }
    return newstr;
  }

  /**
   * @ngdoc function
   * @name angular.isObject
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
   * considered to be objects. Note that JavaScript arrays are objects.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is an `Object` but not `null`.
   */
  static isObject(value) {
    //  http:// jsperf.com/isobject4
    return value !== null && typeof value === 'object';
  }

  /**
   * @Title 将小数转换为百分比
   * @Description 将小数转换为百分比
   * @author hedongyang
   * @param val,n
   * @returns {Boolean}  空返回true
   */
  static getPercent(val, n) {
    if (this.isEmpty(val)) {
      return '0%';
    }
    n = n || 2;
    return (Math.round(val * Math.pow(10, n + 2)) / Math.pow(10, n)).toFixed(n) + '%';
  };

  /**
   * @Title  深度不带地址拷贝
   * @Description 将多个参数的属性拷贝给第一个参数
   * @author hedongyang
   * @version V1.0
   */
  static extendDeep(...paramList): any {
    //  dst为要拷入属性值的对象，使用浅拷贝去除第一级地址指向
    let dst = paramList[0]; //  Object.assign({}, paramList[0]);
    for (const obj of paramList) {
      if (obj !== dst) {
        for (const key in obj) {
          /*排除原型属性*/
          if (obj.hasOwnProperty(key)) {
            let value = obj[key];
            let dstValue = dst[key];
            if (this.isObject(dstValue) || Array.isArray(dstValue)) {
              this.extendDeep(dst[key], value);
            } else {
              if (!value || !value.__proto__) {
                dst[key] = value;
              }else {
                dst[key] = Object.assign( value);
              }

            }
          }
        }
      }
    }
    return dst;
  };

  static extend = function (target,  ...param) {
    let src, copyIsArray, copy, name, options, clone,
      i = 1,
      length = arguments.length,
      deep = false;
    target = arguments[0] || {};
    // Handle a deep copy situation
    if (typeof target === 'boolean') {
      deep = target;

      // skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {};
    }

    // extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          if (options.hasOwnProperty(name)) {
            src = target[name];
            copy = options[name];

            // Prevent never-ending loop
            if (target === copy) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];

              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }

              // Never move original objects, clone them
              target[name] = jQuery.extend(deep, clone, copy);

              // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
    }
    // Return the modified object
    return target;
  }


  /**
   * @Title 返回第一时间
   * @Description 返回第一时间
   * @author hedongyang
   * @param date 进行加减的日期，格式YYYY-MM-DD
   * @param num 往前算就传入负数，往后算就传入正数
   * @param type 月加减和日加减
   * @returns {*}
   */
  static getFirstDate(date, num, type) {
    let nowDate = new Date();
    if (!num) {
      num = 0;
    }
    if (!date) {
      date = nowDate;
    }
    if (typeof(date) === 'string') {
      date = new Date(date);
    }
    if (!type) {
      type = 'dd';
    }
    if (type === 'mm' || type === 'MM') {
      /*月加减*/
      date.setMonth(date.getMonth() + num);
      let month = date.getMonth();
      if (month < 10) {
        month = '0' + month;
      }
      /*let val = date.getFullYear() + '-' + month;*/
      return new Date(date.getFullYear(), month);
    }
    if (type === 'dd' || type === 'DD') {
      // 日加减
      date.setDate(date.getDate() + num);
      let month = date.getMonth();
      let day = date.getDate();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      /*let val = date.getFullYear() + '-' + month + '-' + day;*/
      return new Date(date.getFullYear(), month, day);
    }
  }

  /**
   * @Title 返回对应时间精度的第一时刻
   * @author hedongyang
   * @eg ('2016-08-10 10:18:10'，'MM')  return 2016-08-1 00:00:00
   * @param str 日期字符串
   * @param type 日期精度
   * @returns {Date}
   */
  static strToDate(str, type) {
    if (!str) {
      str = '' + new Date();
    }
    let beginArr = str.split('-');
    if (type === 'mm' || type === 'MM') {
      //  返回每月的第一时刻
      return new Date(beginArr[0], beginArr[1] - 1);
    }
    if (type === 'dd' || type === 'DD') {
      //  返回每天的第一时刻
      return new Date(beginArr[0], beginArr[1] - 1, beginArr[2].substr(0, 2));
    }
  }

  /**
   * 根据所提供的原始时间和增长幅度来获取新的时间（字符串形式）
   * range——增加的幅度（int），可以是负数
   * originDate—— 原始时间，如果不传，则默认是new Date();originDate可以是字符串型‘2015-05-01’，也可以是long型
   */
  static getDate(range, originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    if (typeof range !== 'number' || !range) {
      range = 0;
    }
    return new Date(originDate.getTime() + 24 * 60 * 60 * 1000 * range);
  };

  static getIntegralDate(range, originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    if (typeof range !== 'number' || !range) {
      range = 0;
    }
    let time = originDate.getTime() + 24 * 60 * 60 * 1000 * range;
    let integralTime = time / (24 * 60 * 60 * 1000);
    return new Date(integralTime * 24 * 60 * 60 * 1000 - 8 * 3600 * 1000);
  };

  static getDay(range, originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    if (typeof range !== 'number' || !range) {
      range = 0;
    }
    let date = new Date(originDate.getTime() + 24 * 60 * 60 * 1000 * range);
    return date.getDate();
  };

  static getMonth(range, originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    if (typeof range !== 'number' || !range) {
      range = 0;
    }
    originDate.setMonth(originDate.getMonth() + range);
    return originDate.getMonth() + 1;
  };

  static getYear(range, originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    if (typeof range !== 'number' || !range) {
      range = 0;
    }
    originDate.setFullYear(originDate.getFullYear() + range);
    return originDate.getFullYear();
  };

  static nextDay(originDateStr) {
    return this.getDate(1, originDateStr);
  };

  static nextMonth(originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    originDate.setMonth(originDate.getMonth() + 1);
    return new Date(originDate);
  };

  static nextYear(originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    originDate.setFullYear(originDate.getFullYear() + 1);
    return new Date(originDate);
  };

  static preDay(originDateStr) {
    return this.getDate(-1, originDateStr);
  };

  static preMonth(originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    originDate.setMonth(originDate.getMonth() - 1);
    return new Date(originDate);
  };

  static preYear(originDateStr) {
    let originDate = new Date();
    if (originDateStr) {
      originDate = new Date(originDateStr);
    }
    originDate.setFullYear(originDate.getFullYear() - 1);
    return new Date(originDate);
  };

  /**
   * 删除空属性
   * @param val,n
   * @returns [] 选中的数据
   */
  static deleteEmptyAttr(obj) {
    for (let i in obj) {
      if (this.isEmpty(obj[i])) {
        delete obj[i];
      }
    }
    return obj || {};
  }

  /**
   * 为年月日添加时分秒
   * @param dateStr:年月日
   */
  static appendTime(dateStr) {
    if (dateStr && dateStr.indexOf(' 00:00:00') === -1) {
      return dateStr + ' 00:00:00';
    } else {
      return dateStr;
    }
  }
}
