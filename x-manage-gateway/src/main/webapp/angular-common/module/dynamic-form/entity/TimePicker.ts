import { Component, ViewChild, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { FormItemColSize } from './FormItemColSize';

export class TimePicker extends FormControlBase<Date> {
    controlType = 'timepicker';
    format: string;
    disabledHours(current: Date): boolean {
        return true;
    }
    disabledMinutes(current: Date): boolean {
        return true;
    }
    disabledSeconds(current: Date): boolean {
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
        format: string = 'HH:mm',
        disabledHours?: (current: Date) => boolean,
        disabledMinutes?: (current: Date) => boolean,
        disabledSeconds?: (current: Date) => boolean,
        minlength?: number,
        maxlength?: number,
        title?: string,
        order?: number,
        formItemColSize?: FormItemColSize
    ) {
        super(
            'timepicker',
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
        this.disabledHours = disabledHours;
        this.disabledMinutes = disabledMinutes;
        this.disabledSeconds = disabledSeconds;
    }
}
