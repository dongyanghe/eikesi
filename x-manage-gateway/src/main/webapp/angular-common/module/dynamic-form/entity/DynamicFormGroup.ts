import { FormControlBase } from './FormControlBase';
import { FormItemColSize } from './FormItemColSize';
import { Label } from './label';
import { Observable, Observer } from 'rxjs';

export class DynamicFormGroup {
    key: string; //
    formControlList: Array<FormControlBase<any>>;
    constructor(key: string, formControlList: Array<FormControlBase<any>>) {
        this.key = key;
        this.formControlList = formControlList;
    }
}
