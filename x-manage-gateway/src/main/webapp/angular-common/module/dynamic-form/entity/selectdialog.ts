import { FormControlBase } from './FormControlBase';

export class SelectDialog extends FormControlBase<string> {
    controlType = 'selectDialog';
    type: string;
    options: any;
    clickFun?: Function;
    constructor(
        label: string,
        placeholder: string = '请选择',
        key: string,
        value: any,
        required: boolean = false,
        readonly: boolean = false,
        disabled: boolean = false,
        validation: string = '',
        minlength?: number,
        maxlength?: number,
        title?: string,
        order?: number
    ) {
        super(
            'selectDialog',
            label,
            placeholder,
            key,
            value,
            null,
            required,
            readonly,
            disabled,
            validation,
            minlength,
            maxlength,
            title,
            order
        );
    }
}
