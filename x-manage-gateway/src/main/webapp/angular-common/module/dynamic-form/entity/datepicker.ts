import { Component, ViewChild, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { FormItemColSize } from './FormItemColSize';
import { current } from 'codelyzer/util/syntaxKind';
// import {NzTimePickerInnerComponent} from 'ng-zorro-antd';

export class Datepicker extends FormControlBase<Date> {
    controlType = 'datepicker';
    format: string;
    mode: string; //  选择器模式， month 只选择到月份，day 选择到天
    showTime: boolean;
    disabledDate(current: Date): boolean {
        return true;
    }
    constructor(
        label: string,
        placeholder: string = '请选择',
        key: string,
        value: Date,
        required: boolean = false,
        readonly: boolean = false,
        disabled: boolean = false,
        validation: string = '',
        format: string = 'YYYY-MM-DD HH:mm:ss',
        mode: string = 'day',
        showTime: boolean = true,
        disabledDate?: (current: Date) => boolean,
        minlength?: number,
        maxlength?: number,
        title?: string,
        order?: number,
        formItemColSize?: FormItemColSize
    ) {
        super(
            'datepicker',
            label,
            placeholder,
            key,
            value,
            undefined,
            required,
            readonly,
            disabled,
            validation,
            minlength,
            maxlength,
            title,
            order,
            formItemColSize
        );
        this.format = format;
        this.mode = mode;
        this.showTime = showTime;
        this.disabledDate = disabledDate;
    }
}
