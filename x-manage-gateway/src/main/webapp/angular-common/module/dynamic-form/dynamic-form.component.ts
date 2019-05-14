import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, NgModel, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { HttpService } from '../../service/HttpService';
import { DynamicFormTemplate, FormControlBase, Textbox, SelectDialog } from './entity';
import { Data } from '../../../../node_modules/@angular/router/src/config';
import { NzRadioGroupComponent } from 'ng-zorro-antd';
import { SelectClassComponent } from '../ngx-select-class/select-class.component';
import { VALIDATION } from '../../../data/VALIDATION';

import * as moment from 'moment';
import { UtilityService } from '../../service/UtilityService';
import { MsgService } from '../../service/MsgService';
import { FormService } from '../../service/FormService';

@Component({
    selector: 'dynamic-form',
    templateUrl: 'dynamic-form.component.html',
    providers: [MsgService, UtilityService, NzRadioGroupComponent, SelectClassComponent],
    styleUrls: ['dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    @Input() formGroup: FormGroup;
    @Input() formData?: any; //  void:作废
    @Input() formControlList: Array<FormControlBase<any>>;
    @Input() type: String;
    @Input() title?: String;
    @Input() msg?: String;
    @Input() msgLink?: String;
    selectedColumn: any;
    private isHidden: boolean = true;
    VALIDATION: any = VALIDATION;
    _startDate: Data;
    _endDate: Data;
    constructor(public nzModalService: NzModalService, httpService: HttpService) {}

    invalidCallback(key, controls, formGroup) {
        // console.log(key, controls, formGroup);
    }
    ngOnInit() {
        // console.log('DynamicFormComponent form：', this.formGroup);
        // console.log('DynamicFormComponent templateName：', this.formControlList);
    }

    /**
     * 弹窗打开回调
     * @param field
     */
    onShown() {
        // console.log('onShow');
    }

    /**
     * 弹窗关闭回调
     * @param field
     */
    onHidden() {
        // console.log('onHide');
    }
    getValidationMsg(validationStr) {
        let msg = '输入格式有误';
        if (VALIDATION[validationStr]) {
            msg = VALIDATION[validationStr].label;
        } else {
            const regExpList = validationStr.split('_');
            if (regExpList[0] == 'float') {
                let m: any = regExpList.length > 1 ? '最多' + regExpList[1] : '任意';
                let n: any = regExpList.length > 2 ? '最多' + regExpList[2] : '任意';
                // m = m > 1 ? (m - 1) : 0;
                // n = n > 0 ? n : 0;

                msg = VALIDATION[regExpList[0]].label;
                msg = msg.replace('regexp_m', m);
                msg = msg.replace('regexp_n', n);
            }
        }
        return msg;
    }
    openSelectDialog() {
        const self = this;
        // const subscription = self.nzModalService.open({
        //   title          : 'A模块',
        //   content        : self.field.component,
        //   // width        : self.CONFIG.nzModalConfig.width,
        //   class         : 'page-ant-modal modal-lg',
        //   onOk() {
        //     console.log('a Click onOk');
        //   },
        //   onCancel() {
        //     console.log('a Click onCancel');
        //   },
        //   footer         : false,
        //   componentParams: {
        //     orginalData: formData
        //   }
        // });
        /**
         * 订阅弹窗回调数据
         */
        // subscription.subscribe(result => {
        //   console.log('订阅弹窗回调：' + result);
        // })
    }

    showDatepicker() {
        console.log((this.isHidden = !this.isHidden));
    }

    selectionDone() {
        this.isHidden = !this.isHidden;
    }
    getValid(index) {
        let self = this;
        return self.formGroup.controls[self.formControlList[index].key].valid;
    }
    set(index, data) {
        let self = this;
        let value = {};
        value[self.formControlList[index].key] = data.value;
        self.formGroup.patchValue(value);
    }

    /**
     * dataPicker
     */
    newArray = len => {
        const result = [];
        for (let i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    };

    _startValueChange = index => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledStartDate = startValue => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledEndDate = endValue => {
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    };
    get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day');
    }
    get _endTime() {
        return {
            nzHideDisabledOptions: true,
            nzDisabledHours: () => {
                return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
            },
            nzDisabledMinutes: h => {
                if (this._isSameDay && h === this._startDate.getHours()) {
                    return this.newArray(this._startDate.getMinutes());
                }
                return [];
            },
            nzDisabledSeconds: (h, m) => {
                if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
                    return this.newArray(this._startDate.getSeconds());
                }
                return [];
            }
        };
    }
}
class EditDynamicTable {
    addRow(formControl: FormControlBase<any>) {}
}
