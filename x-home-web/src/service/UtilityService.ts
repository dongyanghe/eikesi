export default class UtilityService {
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
}
