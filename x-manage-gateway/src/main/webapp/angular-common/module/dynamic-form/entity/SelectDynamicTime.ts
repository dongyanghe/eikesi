import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { HttpService } from '../../../service/HttpService';
/**
 * 数据字典配置类
 */
import { DICT } from '../../../../data/DICT';
import { FormItemColSize } from './FormItemColSize';

/**
 * void:未开发
 * 动态选择时间段
 * 可自定义新增
 */
export class SelectDynamicTime extends FormControlBase<string> {
    options: {
        type?: string;
        dataList?: Array<any>; //  为空的时候，若字典有type对应的字段则取字典数据，否则从后台取
        httpService?: HttpService;
    };

    constructor(
        label: string,
        placeholder: string = '--请选择--',
        key: string,
        value: any,
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
            'select',
            label,
            placeholder,
            key,
            value,
            options,
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
        self.options = options;
        //  没有dataList的自动赋值
        if (!self.options.dataList || !self.options.dataList.length) {
            self.options.dataList = [];
            let dataList = DICT[self.options.type];
            //  如果字典有该字段则取字典
            if (dataList) {
                self.options.dataList = dataList;
            } else {
                //  后台请求获取下拉列表数据
                switch (self.options.type) {
                    case 'business':
                        if (!this.options.httpService) {
                            console.error('http not found');
                            self.options.dataList = [];
                            break;
                        }
                        //  http请求数据后赋值给dataList
                        self.options.dataList = [
                            {
                                value: 'all',
                                label: '全部'
                            }
                        ];
                        break;
                }
            }
        }
    }
}
