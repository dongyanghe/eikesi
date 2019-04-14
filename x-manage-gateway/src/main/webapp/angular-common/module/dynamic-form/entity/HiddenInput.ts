import { FormControlBase } from './FormControlBase';
import { FormItemColSize } from './FormItemColSize';
import { Label } from './label';

export class HiddenInput extends FormControlBase<string> {
    type: string;
    /**
     * 自适应内容高度，可设置为 true|false 或对象：{ minRows: 2, maxRows: 6 }
     */
    nzAutosize?: Boolean | Object;
    /**
     * 控制固定框的行数
     */
    nzRows?: string;

    constructor(key: string, value: any = '') {
        super('hidden', '', '', key, value);
    }
}
