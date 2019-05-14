import { FormControlBase } from './FormControlBase';
import { HttpService } from '../../../service/HttpService';
/**
 * 配置类
 */
import { DICT } from '../../../../data/DICT';
export class TimeFrame extends FormControlBase<string> {
    controlType = 'timeFrame';
    isStartBol: boolean;
    // startTime: {
    //   key: string,
    //   placeholder: string,
    //   value: string,
    // };
    // endTime: {
    //   key: string,
    //   placeholder: string,
    //   value: string,
    // };
    constructor(
        label: string,
        placeholder: string = '请选择',
        key: string,
        value: any,
        options: { type: string; dataList?: Array<any>; httpService?: HttpService },
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
            'timeFrame',
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
        let self = this;
        self.isStartBol = options['isStartBol'] || false;
        // self.endTime = options['endTime'];
    }
}
