import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { HttpService } from '../../../service/HttpService';
/**
 * 数据字典配置类
 */
import { DICT } from '../../../../data/DICT';
import { FormItemColSize } from './FormItemColSize';

export class Select extends FormControlBase<string> {
    nzmode?: string;
    dataList: Array<any>;
    labelKey?: string;
    valueKey?: string;
    constructor(
        label: string,
        placeholder: string = '--请选择--',
        key: string,
        value: any,
        dataList: Array<any>,
        labelKey: string = 'label',
        valueKey: string = 'value',
        required: boolean = false,
        readonly: boolean = false,
        disabled: boolean = false,
        validation: string = '',
        nzmode: string = '',
        title?: string,
        order?: number,
        formItemColSize?: FormItemColSize
    ) {
        super(
            'select',
            label,
            placeholder,
            key,
            value,
            undefined,
            required,
            readonly,
            disabled,
            validation,
            undefined,
            undefined,
            title,
            order,
            formItemColSize
        );
        const self = this;
        self.dataList = dataList;
        self.labelKey = labelKey;
        self.valueKey = valueKey;
        self.nzmode = nzmode;
    }
}
