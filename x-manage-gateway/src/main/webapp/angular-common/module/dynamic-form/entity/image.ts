import { FormControlBase } from './FormControlBase';

export class Image extends FormControlBase<string> {
    controlType = 'image';
    src: string;
    constructor(
        label: string,
        placeholder: string = '请选择',
        key: string,
        value: any,
        src: string,
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
            'image',
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
            order
        );
        this.src = src;
    }
}
