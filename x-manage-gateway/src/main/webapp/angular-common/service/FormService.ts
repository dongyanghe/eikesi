import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import {DateService} from './DateService';
import {FormControl, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {FormControlBase, EditDynamicTable, DynamicFormGroup, Textbox, TextGroup} from '../module/dynamic-form/entity';
import {MsgService} from './MsgService';
import {UserService} from './UserService';
// import {ToasterService} from 'angular2-toaster';
/**
 * 全局变量
 */
import {CONFIG} from '../../data/CONFIG';
import {URL} from '../../data/URL';
import {CODE} from '../../data/CODE';
import {VALIDATION} from '../../data/VALIDATION';
//  import { GLOBAL } from '../../data/DICT';
/**
 * http请求代理类
 */
@Injectable()
export class FormService {

   /**
   * 根据key返回下一级control
   * @param {AbstractControl} parentControl
   * @param {string} key
   * @returns {any}
   */
   static getNextControl (parentControl: AbstractControl, key: string | number) {
    if (parentControl instanceof FormControl) {
      return parentControl[ key ];
    }
    if (parentControl instanceof FormGroup) {
      return parentControl.controls[ key ];
    }
    if (parentControl instanceof FormArray) {
      return parentControl.controls[ key + '' ];
    }
  }
  /**
   * 返回指定Control，可自我调用以实现深层读取
   * @param name
   * @returns {any}
   */
  static getControl(formGroup: FormGroup, keyList: Array<string>, arrayKeyList?: Array<number>, ): AbstractControl {
    //  寻找的控制器
    let control: AbstractControl = formGroup;

    try {
      //  arrayKeyList的位移下标
      let i: number = 0;
      for (const key of keyList){
        if (control instanceof FormArray) {
          control = this.getNextControl(control, arrayKeyList[i++]);
        } else {
          control = this.getNextControl(control, key);
        }
      }
    } catch (e) {
      console.error('找不到指定control：', formGroup, control, arrayKeyList)
    }
    return control;
  }

  /**
   * 返回指定Control，可自我调用以实现深层读取
   * @param name
   * @returns {any}
   */
  static setControl(formGroup: FormGroup, setCntrol: AbstractControl, keyList: Array<string >, arrayKeyList?: Array<number>): boolean {
    try {
      //  arrayKeyList的位移下标
      let i: number = 0;
      //  setCntrol对应的key
      const setKey: string = keyList[keyList.length - 1];
      if (keyList.length == 1) {
        formGroup.setControl(setKey, setCntrol);
        return true;
      }
      keyList.pop();
      // 父级控制器
      let control: AbstractControl = this.getControl(formGroup, keyList, arrayKeyList);

      if (control instanceof FormGroup) {
        control.setControl(setKey, setCntrol);
      }
      if (control instanceof FormArray) {
        control.setControl(arrayKeyList[i++], setCntrol);
      }
    } catch (e) {
      console.error('找不到指定control：', formGroup, setCntrol, keyList, arrayKeyList)
    }
  }
  /**
   * 表单的正则表达式校验
   * @param {string} validation
   * @returns {ValidatorFn}
   */
  static validationValidator(validationStr: string): ValidatorFn {
    let regExpStr =  '';
    if (VALIDATION[validationStr]) {
      regExpStr = VALIDATION[validationStr].value;
    } else {
      const regExpList = validationStr.split('_');
      if (regExpList[0] == 'float') {
        let m: any = (regExpList.length > 1) ? regExpList[1] : '';
        let n: any = (regExpList.length > 2) ? regExpList[2] : '';
        if (!isNaN(m)) {
          m = m > 1 ? (m - 1) :  '';
        }
        regExpStr = VALIDATION[regExpList[0]].value;
        regExpStr = regExpStr.replace('regexp_m', m);
        regExpStr = regExpStr.replace('regexp_n', n);
      }
    }
    const regExp: RegExp = new RegExp(regExpStr); //  VALIDATION[validationStr].value;
    return (control: AbstractControl): {[key: string]: any} => {
      const forbidden = regExp.test(control.value);
      let validationObj = {};
      validationObj[validationStr] = {value: control.value};
      return forbidden ? null : validationObj;
    };
  }
  /**
   * 根据FieldBase配置创建表单
   * @param
   * @returns {FormGroup}
   */
  static toFormGroup(...formControlLists: Array<Array<FormControlBase<any> | DynamicFormGroup>>) {
    let group: any = {};
    for (let formControlList of formControlLists) {
      for (let formControlOrDynamicFormGroup of formControlList) {
        /**
         * 普通表单组件的响应式表单FormControl获取
         * @param {FormControlBase<any>} formControl
         * @returns {FormControl}
         */
        let formControlBaseCheck = function (formControl: FormControlBase<any>): FormControl {
          let validatorOrOpts = new Array();
          if (formControl instanceof Textbox || formControl instanceof TextGroup) {
            //  如果是输入数字则校验最大最小
            if (formControl.type == 'number') {
              validatorOrOpts.push(Validators.min(formControl.minlength), Validators.max(formControl.maxlength));
            } else {
              validatorOrOpts.push(Validators.minLength(formControl.minlength), Validators.maxLength(formControl.maxlength));
            }
          }
          if (formControl.required) {
            validatorOrOpts.push(Validators.required);
          }
          if (formControl.validation) {
            validatorOrOpts.push(FormService.validationValidator(formControl.validation));
          }
          return new FormControl(formControl.value, validatorOrOpts);
        }/** -end:formControlBaseCheck *****************************************************************************************************/

        /** 动态编辑表格需要组装formArray *************************************************************************************************/
        //  普通无嵌套组件
        if (formControlOrDynamicFormGroup instanceof FormControlBase) {
          group[formControlOrDynamicFormGroup.key] = formControlBaseCheck(formControlOrDynamicFormGroup);
        }
        //  普通嵌套一级的组件
        if (formControlOrDynamicFormGroup instanceof DynamicFormGroup) {
          let dynamicFormGroup: any = {};
          for (let formControl of formControlOrDynamicFormGroup.formControlList) {
            //  普通嵌套一级的组件
            if (formControl instanceof FormControlBase) {
              dynamicFormGroup[formControl.key] = formControlBaseCheck(formControl);
            }
            //  普通嵌套一级的动态表格
            if (formControl instanceof EditDynamicTable) {
              dynamicFormGroup[formControl.key] = formControl.getFormArray();
            }
            /*let validatorOrOpts = new Array(Validators.min(formControl.minlength), Validators.max(formControl.maxlength));
            if (formControl.required) {
              validatorOrOpts.push(Validators.required);
            }
            if (formControl.validation) {
              validatorOrOpts.push(FormService.validationValidator(formControl.validation));
            }
            dynamicFormGroup[formControl.key] = new FormControl(formControl.value, validatorOrOpts);*/
          }
          group[formControlOrDynamicFormGroup.key] = new FormGroup(dynamicFormGroup);
        }
        //  普通无嵌套动态表格
        if (formControlOrDynamicFormGroup instanceof EditDynamicTable) {
          group[formControlOrDynamicFormGroup.key] = formControlOrDynamicFormGroup.getFormArray();  //  editDynamicTableCheck(formControlOrDynamicFormGroup);
        }
      }
    }
    return new FormGroup(group);
  }

  /**
   * multiSelect获取数据
   * @param val,n
   * @returns [] 选中的数据
   */
  static getMultiSelected(inputModel) {
    let selected = [];
    for (let data of inputModel) {
      if (data.ticked) {
        selected.push(data);
      }
    }
    return selected;
  };

  constructor(public msgService: MsgService) {
    console.log('/************************init FormService************************/');
  }
}
