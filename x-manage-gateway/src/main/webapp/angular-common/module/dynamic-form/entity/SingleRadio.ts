import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { FormItemColSize } from './FormItemColSize';

export class SingleRadio extends FormControlBase<boolean> {
    controlType = 'singleradio';
    dictName: string;
    dataList: Array<any>;
    constructor(
        label: string,
        placeholder: string = '请选择',
        key: string,
        value: any = '',
        options: FieldBaseOptions,
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
            'singleradio',
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
        /*
    this.dictName = options['type'] || '';
    this.dataList = options['dataList'] || [];
    if ((!this.dataList || this.dataList.length === 0)
      && !this.dictName) {
      console.error('dictName或dataList必须至少有一个');
    }*/
    }
}
