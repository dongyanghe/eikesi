import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { FormItemColSize } from './FormItemColSize';

export class Radio extends FormControlBase<string> {
    controlType = 'radio';
    dictName: string;
    dataList: Array<any>;
    labelKey?: string;
    valueKey?: string;
    constructor(
        label: string,
        placeholder: string = '请选择',
        key: string,
        value: any,
        dataList: Array<any>,
        labelKey: string = 'label',
        valueKey: string = 'value',
        required: boolean = false,
        readonly: boolean = false,
        disabled: boolean = false,
        validation: string = '',
        minlength?: number,
        maxlength?: number,
        title?: string,
        order?: number,
        formItemColSize?: FormItemColSize
    ) {
        super(
            'radio',
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

        const self = this;
        self.dataList = dataList;
        self.labelKey = labelKey;
        self.valueKey = valueKey;

        /*
    this.dictName = options['type'] || '';
    this.dataList = options['dateList'] || [];
    if ((!this.dataList || this.dataList.length === 0)
      && !this.dictName) {
      console.error('dictName或dataList必须至少有一个');
    }*/
    }
}
