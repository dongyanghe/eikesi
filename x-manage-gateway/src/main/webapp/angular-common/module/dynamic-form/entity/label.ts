import { FormControlBase } from './FormControlBase';

export class Label extends FormControlBase<string> {
    label: string;
    value: string;
    constructor(label: string, value: any) {
        super('Label', label, 'Label', '', value);
    }
}
