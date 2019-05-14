import { Component, ViewChild, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { FormItemColSize } from './FormItemColSize';
/**
 * new Rangepicker('label', ['开始时间', '结束时间'], '', 'key', '')
 * 提交表单查询之前需要转换日期
 * key:["2018-01-08T16:00:00.000Z","2018-01-09T16:00:00.000Z"]
 */
export class Rangepicker extends FormControlBase<Array<any>> {
    controlType = 'rangepicker';
    dataList: Array<any>;
    placeholders: Array<any>;
    placeholder = '';
    format: string;
    showTime: boolean;
    disabledDate(current: Date): boolean {
        return true;
    }
    constructor(
        label: string,
        placeholders: Array<any> = ['开始', '结束'],
        placeholder: string = '请选择',
        key: string,
        value: Array<Date>,
        required: boolean = false,
        readonly: boolean = false,
        disabled: boolean = false,
        validation: string = '',
        format: string = 'YYYY-MM-DD HH:mm:ss',
        showTime: boolean = true,
        disabledDate?: (current: Date) => boolean,
        minlength?: number,
        maxlength?: number,
        title?: string,
        order?: number,
        formItemColSize?: FormItemColSize
    ) {
        super(
            'rangepicker',
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
        this.placeholders = placeholders;
        this.format = format;
        this.showTime = showTime;
        this.disabledDate = disabledDate;
    }
}
